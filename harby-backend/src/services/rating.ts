import { buildQuery, FindConfig, Selector, TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { rating } from "../models/rating"

class RatingService extends TransactionBaseService {
    protected manager_: EntityManager
    protected transactionManager_: EntityManager

    async retrieve(id: string): Promise<rating | undefined> {
        const ratingRepo = this.manager_.getRepository(rating)
        return await ratingRepo.findOne({ where: { id: id } })
    }

    async listAndCount(
        selector?: Selector<rating>,
        config: FindConfig<rating> = {
            skip: 0,
            take: 20,
            relations: [],
        }): Promise<[rating[], number]> {
        const ratingRepo = this.manager_.getRepository(rating)

        const query = buildQuery(selector, config)

        return ratingRepo.findAndCount(query)
    }
}

export default RatingService