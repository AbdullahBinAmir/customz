import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class bulorder extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  email: string;
}
