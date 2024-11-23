import { Metadata } from "next"
import About from "@modules/about-us"

export const metadata: Metadata = {
  title: "CustomZ contact us",
  description: "contact to CustomZ team",
}

export default function ContactUs() {
  return <About />
}
