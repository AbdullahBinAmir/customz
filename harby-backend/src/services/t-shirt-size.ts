import { TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { TShirtSize } from "../models/t-shirt-size"

class TShirtSizeService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager

  async create(data: Partial<TShirtSize>): Promise<TShirtSize> {
    const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
    const tShirtSize = tShirtSizeRepo.create(data)
    return await tShirtSizeRepo.save(tShirtSize)
  }

//   async retrieve(id?: string): Promise<TShirtSize | undefined> {
//     const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
//     return await tShirtSizeRepo.findOne({ where: { product_id:id } })
//   }

  async list(productId?: string): Promise<TShirtSize[]> {
    const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
    const query: any = {}
    if (productId) {
      query.product_id = productId
    }
    return await tShirtSizeRepo.find({ where: query })
  }

//   async update(id: string | any, data: Partial<TShirtSize>): Promise<TShirtSize> {
//     const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
//     const tShirtSize = await this.retrieve(id)

//     if (!tShirtSize) {
//       throw new Error(`T-shirt size with id ${id} not found`)
//     }

//     Object.assign(tShirtSize, data)
//     return await tShirtSizeRepo.save(tShirtSize)
//   }

  async delete(id?: string): Promise<void> {
    const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
    await tShirtSizeRepo.delete(id)
  }

  async listForStore(productId?: string): Promise<TShirtSize[]> {
    const tShirtSizeRepo = this.manager_.getRepository(TShirtSize)
    const query: any = {}
    if (productId) {
      query.product_id = productId
    }
    return await tShirtSizeRepo.find({
      where: query,
      order: {
        fit: "ASC",
        size: "ASC"
      }
    })
  }
}

export default TShirtSizeService