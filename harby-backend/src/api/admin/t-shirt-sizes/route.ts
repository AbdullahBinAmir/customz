import { generateEntityId, type MedusaRequest, type MedusaResponse } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import TShirtSizeService from "../../../services/t-shirt-size"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const tShirtSizeService: TShirtSizeService = req.scope.resolve("tShirtSizeService")
    const { product_id } = req.query

    const tShirtSizes = await tShirtSizeService.list(product_id as string)

    res.status(200).json({ t_shirt_sizes: tShirtSizes })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const tShirtSizeService: TShirtSizeService = req.scope.resolve("tShirtSizeService")
    const manager: EntityManager = req.scope.resolve("manager")
    const data = req.body
    data["id"] = generateEntityId("", "sg")
    const created = await manager.transaction(async (transactionManager) => {
        return await tShirtSizeService
            .withTransaction(transactionManager)
            .create(data)
    })

    res.status(201).json({ t_shirt_size: created })
}

// export async function PUT(req: MedusaRequest, res: MedusaResponse) {
//     const tShirtSizeService: TShirtSizeService = req.scope.resolve("tShirtSizeService")
//     const manager: EntityManager = req.scope.resolve("manager")

//     const updated = await manager.transaction(async (transactionManager) => {
//         return await tShirtSizeService
//             .withTransaction(transactionManager)
//             .update(req.query.id, req.body)
//     })

//     res.json({ t_shirt_size: updated })
// }

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
    const tShirtSizeService: TShirtSizeService = req.scope.resolve("tShirtSizeService")
    const manager: EntityManager = req.scope.resolve("manager")

    await manager.transaction(async (transactionManager) => {
        return await tShirtSizeService
            .withTransaction(transactionManager)
            .delete(req.query.id as string)
    })

    res.status(204).end()
}