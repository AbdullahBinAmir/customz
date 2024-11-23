import Blog from "@modules/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CustomZ blogs",
  description: "Read blogs posted by CustomZ",
}

export default function BLog() {
  return <Blog />
}
