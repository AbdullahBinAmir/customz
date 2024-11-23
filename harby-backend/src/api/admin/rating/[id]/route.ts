import { MedusaRequest } from "medusa-extender"
import { MedusaResponse } from "@medusajs/medusa"
import RatingService from "../../../../services/rating"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const ratingService: RatingService = req.scope.resolve("ratingService")

    const rating = await ratingService.retrieve(req.params.id)

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" })
    }
  
    res.status(200).json(rating)
}