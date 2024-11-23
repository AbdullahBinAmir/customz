import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import TShirtSizeService from "../../../services/t-shirt-size"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const tShirtSizeService: TShirtSizeService = req.scope.resolve("tShirtSizeService")
  const { product_id } = req.query

  const tShirtSizes = await tShirtSizeService.listForStore(product_id as string | undefined)

  res.status(200).json({ t_shirt_sizes: tShirtSizes })
}