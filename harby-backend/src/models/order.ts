import { Column, Entity } from "typeorm";
import {
  // alias the core entity to not cause a naming conflict
  Order as MedusaOrder,
} from "@medusajs/medusa";
export declare enum OrderStatusV2 {
  PENDING = "pending",
  COMPLETED = "completed",
  ARCHIVED = "archived",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
  READY_TO_DESIGN = "ready_to_design",
  READY_TO_PRINT = "ready_to_print",
  READY_TO_SHIP = "ready_to_ship",
}
@Entity()
export class Order extends MedusaOrder {
  @Column({ default: "" })
  designerImage: string;
  @Column({ default: "pending", type: "text" })
  customStatus: OrderStatusV2;
}
