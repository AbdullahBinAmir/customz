import { Column, Entity } from "typeorm";
import {
  // alias the core entity to not cause a naming conflict
  Product as MedusaProduct,
} from "@medusajs/medusa";

@Entity()
export class Product extends MedusaProduct {
  @Column({ default: "" })
  designerImage: string;
  @Column({ default: "pending" })
  customStatus: string;
  @Column({ default: null })
  rating: number;
}
