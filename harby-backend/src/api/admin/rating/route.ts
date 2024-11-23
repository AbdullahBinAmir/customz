import { MedusaRequest } from "medusa-extender"
import { FindConfig, MedusaResponse } from "@medusajs/medusa"
import RatingService from "../../../services/rating"
import { rating } from "../../../models/rating"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const ratingService: RatingService = req.scope.resolve("ratingService")

    const { limit, offset } = req.query
    const selector = {}
    const config: FindConfig<rating> = {
      skip: parseInt(offset as string) || 0,
      take: parseInt(limit as string) || 20,
      relations: [],
    }
  
    const [ratings, count] = await ratingService.listAndCount(selector, config)
  
    res.status(200).json({
      ratings,
      count,
      offset: config.skip,
      limit: config.take,
    })
}