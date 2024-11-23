import { Metadata } from "next"
import BulkOrder from "@modules/bulk-order"

export const metadata: Metadata = {
  title: "CustomZ bulk order",
  description: "create your bulk order",
}

export default function ContactUs() {
  return <BulkOrder />
}
