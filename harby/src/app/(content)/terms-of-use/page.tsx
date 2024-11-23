import { Metadata } from "next"
import Terms from "@modules/terms-of-use"

export const metadata: Metadata = {
  title: "CustomZ privacy policy",
  description: "CustomZ privacy policy",
}

export default function TermsPrivacy() {
  return <Terms />
}
