import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class customizer extends BaseEntity {
  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  name: string;
}
