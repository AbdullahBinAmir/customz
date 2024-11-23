import { Metadata } from "next"
import CustomerService from "@modules/customer-service"

export const metadata: Metadata = {
  title: "CustomZ customer service",
  description: "contact to CustomZ team for any query/question",
}

export default function ContactUs() {
  return <CustomerService />
}
