import { UserType } from "./models/user";
import { OrderStatusV2 } from "./models/order";

export declare module "@medusajs/medusa/dist/models/user" {
  declare interface User {
    user_type: UserType;
  }
}
export declare module "@medusajs/medusa/dist/models/order" {
  declare interface Order {
    designerImage: string;
    customStatus: OrderStatusV2;
  }
}
export declare module "@medusajs/medusa/dist/models/product" {
  declare interface Product {
    cdesignerImage: string;
    customStatus: string;
    rating: number;
    review: string;
    user_id: string;
  }
}
