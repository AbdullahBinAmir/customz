import { BaseEntity } from "@medusajs/medusa"
import { Column, Entity } from "typeorm"

@Entity()
export class TShirtSize extends BaseEntity {
  @Column({ type: "varchar" })
  fit: "regular" | "oversize"

  @Column({ type: "varchar", nullable: true })
  product_id: string | null

  @Column({ type: "varchar" })
  size: string

  @Column({ type: "int" })
  chest_min: number

  @Column({ type: "int" })
  chest_max: number

  @Column({ type: "int" })
  length: number
}