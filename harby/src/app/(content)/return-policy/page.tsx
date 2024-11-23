import { Metadata } from "next"
import Return from "@modules/return-policy"

export const metadata: Metadata = {
  title: "CustomZ return policy",
  description: "CustomZ return policy",
}

export default function ReturnPolicy() {
  return <Return />
}
