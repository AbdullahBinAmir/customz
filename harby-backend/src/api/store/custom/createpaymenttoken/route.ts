import { Request, Response } from "express";
import { medusaUrl } from "../../../../admin/routes/personalizer/common/services/config";
import crypto from "crypto";
import axios from "axios";

function generateSignature(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(req: Request, res: Response) {
  const { customerProfileId } = req.query;
  const merchantCode = "770000020001"
  const secret = "369d3498-e29e-43e8-a1a8-2d73ec9b9096"
  const hashString = `${merchantCode}${customerProfileId}${secret}`
  const returnUrl = `https://customz.shop/checkout`;
  const cardTokenUrl = `https://atfawry.fawrystaging.com/atfawry/plugin/card-token?accNo=${merchantCode}&customerProfileId=${customerProfileId}&returnUrl=${encodeURIComponent(returnUrl)}`;
  try {
    const signature_hash = generateSignature(hashString)
    let config = {
      method: 'get',
      url: `https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/cards/cardToken?merchantCode=${merchantCode}&customerProfileId=${customerProfileId}&signature=${signature_hash}`,
    };

    const result = await axios.request(config)

    if (result.data?.cards?.length > 0) {
      return res.status(200).send(result.data);
    }
    else {
      return res.status(200).send({ url: cardTokenUrl });
    }
  }
  catch (error) {
    // res.status(500).send("Payment processing failed: " + error.message);
    return res.status(500).send({ error: error });
  }

};


// export async function GET(req: Request, res: Response) {
//   try {
//     res.send({
//         statusCode: '200',
//         statusDescription: 'Operation done successfully',
//         isDefault: 'false',
//         token: '189edff0e380211c87c7051506b2ba99052a135066ab80f21682802737610b34',
//         creationDate: '1727938491869',
//         lastFourDigits: '4242',
//         firstSixDigits: '424242',
//         default: 'false',
//         cardHolderName: 'Osama'
//       })
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

