import { Metadata } from "next"
// import { redirect } from "next/navigation"
import Customizer from "@modules/customizer"

export const metadata: Metadata = {
  title: "Customizer",
  description: "customize your shirts",
}

export default function Cart() {
  // return redirect("http://localhost:8000/index.html")
  return <Customizer />
}
