import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity } from "typeorm";

@Entity()
export class rating extends BaseEntity {
  @Column({ nullable: true })
  productid: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  review: string;
}
