import dotenv from 'dotenv';
// import fs from "fs-extra";
// import cloudinary from 'cloudinary';

dotenv.config();

// cloudinary.v2.config({
//   cloud_name: 'da8istqfc',
//   api_key: '761258952792341',
//   api_secret: 'm7WiVmzBPmqjN3IVi1DX33e99vU'
// });

// export async function POST(req: any, res: any) {
//     const { base } = req.body;
//     // console.log(req.body.base)
//    try{
//     if (!base) {
//       res.status(400).json({ error: "base64Data is required" });
//       return;
//     }
  
//     const base64WithoutPrefix = base.replace(/^data:image\/\w+;base64,/, "");
//     try {
//       const result = await cloudinary.v2.uploader.upload_large(`data:image/png;base64,${base64WithoutPrefix}`);
//       res.json({ message: "Image saved", fileURL: result.secure_url });
//     } catch (err) {
//       console.error("Error uploading the image to Cloudinary:", err);
//       return res.status(500).json({ error: 'Error uploading the image' });
//     }
  
//    }
//   catch(err){
//     console.error("Error saving the image:", err);
//     res.status(500).json({ error: "Error saving the image" });
//   }
// }

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  endpoint: process.env.SPACE_ENDPOINT,
  region: process.env.SPACE_REGION, // Use your region
  credentials: {
    accessKeyId: process.env.SPACE_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY,
  },
});

export async function POST(req, res) {
  const { base } = req.body;

  try {
    if (!base) {
      return res.status(400).json({ error: "base64Data is required" });
    }
    // Remove the prefix from the base64 string
    const base64WithoutPrefix = base.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64WithoutPrefix, "base64");

    // Generate a unique file name
    const fileName = `${uuidv4()}.png`;

    // Configure upload parameters
    const uploadParams:any = {
      Bucket: process.env.SPACE_BUCKET,
      Key: fileName,
      Body: imageBuffer,
      ContentEncoding: "base64",
      ContentType: "image/png",
      ACL: "public-read",
    };

    // Upload to Spaces
    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      const fileURL = `${process.env.SPACE_URL}/${fileName}`;
      res.json({ message: "Image saved", fileURL });
    } catch (err) {
      console.error("Error uploading the image to Spaces:", err);
      res.status(500).json({ error: "Error uploading the image" });
    }
  } catch (err) {
    console.error("Error processing the request:", err);
    res.status(500).json({ error: "Error processing the request" });
  }
}