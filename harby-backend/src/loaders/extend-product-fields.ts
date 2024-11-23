import { Column } from "typeorm";
import { OrderStatusV2 } from "../models/order";

export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any;
  imports.allowedStoreProductsFields = [
    ...imports.allowedStoreProductsFields,
    "designerImage",
    "customStatus",
    "rating",
  ];
  imports.defaultStoreProductsFields = [
    ...imports.defaultStoreProductsFields,
    "designerImage",
    "customStatus",
    "rating",
  ];
}
