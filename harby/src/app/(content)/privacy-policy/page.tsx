import { Metadata } from "next"
import Privacy from "@modules/privacy-policy"

export const metadata: Metadata = {
  title: "CustomZ privacy policy",
  description: "CustomZ privacy policy",
}

export default function PrivacyPolicy() {
  return <Privacy />
}
