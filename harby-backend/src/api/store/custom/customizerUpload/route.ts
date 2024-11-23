import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import axios from "axios";
import OpenAI from "openai";
import Medusa from "@medusajs/medusa-js"
import { Blob } from "buffer";
import { medusaUrl } from "../../../../admin/routes/personalizer/common/services/config";

const medusa = new Medusa({ baseUrl: medusaUrl, maxRetries: 3 })
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
const upload = multer({ storage: multer.memoryStorage() });

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const s3Client = new S3Client({
    endpoint: process.env.SPACE_ENDPOINT,
    region: process.env.SPACE_REGION,
    credentials: {
      accessKeyId: process.env.SPACE_ACCESS_KEY_ID,
      secretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY,
    },
  });

  upload.any()(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      //@ts-ignore
      if (req.files && req.files.length > 0) {
        //@ts-ignore
        const isToggle = req.body.isBgRemove === "true"; // Check the toggle value
        const uploadResults = await Promise.all(
          //@ts-ignore
          req.files.map(async (file) => {
            let fileBuffer = file.buffer;
            // If isToggle is true, call the remove-bg API
            if (isToggle) {
              const formData: any = new FormData();
              const blob = new Blob([file.buffer], { type: file.mimetype });
              formData.append("file", blob, file.originalname);

              const requestOptions = {
                method: "POST",
                body: formData,
              };

              const removeBgResponse = await fetch("https://dashboard.customz.shop/remove-bg", requestOptions)
              // console.log(removeBgResponse)
              // Use the background-removed file buffer
              const arrayBuffer = await removeBgResponse.arrayBuffer();
              fileBuffer = Buffer.from(arrayBuffer);
            }

            const fileExtension = file.originalname.split(".").pop();
            const fileName = `${uuidv4()}.${fileExtension}`;

            const params: any = {
              Bucket: process.env.SPACE_BUCKET,
              Key: fileName,
              Body: fileBuffer,
              ACL: "public-read",
              ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            return {
              image_src: `${process.env.SPACE_URL}/${fileName}`,
              filename: fileName,
            };
          })
        );

        return res.status(200).json({
          image_src: uploadResults[0].image_src,
          filename: uploadResults[0].filename,
          warning: null,
        });
        //@ts-ignore
      } else if (req.body.text) {
        // Use OpenAI to generate an image if text is provided
        const dalleResponse = await openai.images.generate({
          model: "dall-e-3",
          //@ts-ignore
          prompt: req.body.text,
          n: 1,
          size: "1024x1024"
        });

        const imageUrl = dalleResponse.data[0].url;
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        const fileName = `${uuidv4()}.png`;

        const params: any = {
          Bucket: process.env.SPACE_BUCKET,
          Key: fileName,
          Body: imageBuffer,
          ACL: "public-read",
          ContentType: "image/png",
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileUrl = `${process.env.SPACE_URL}/${fileName}`;

        //@ts-ignore
        medusa.carts.update(req.body.cart_id, {
          discounts: [{
            code: "AIIMAGES"
          }]
        })
          .then(({ cart }) => {
            console.log(cart.id);
          }).catch((e) => {
            console.log(e)
          })

        return res.status(200).json({
          image_src: fileUrl,
          filename: fileName,
          warning: null,
        });
      } else {
        return res.status(400).json({ error: "No files uploaded or text provided" });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });
}