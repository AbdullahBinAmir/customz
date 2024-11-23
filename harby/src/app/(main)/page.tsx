import { Metadata } from "next"
import LandingPage from "@modules/home"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop all available models only at the CustomZ. Worldwide Shipping. Secure Payment.",
}

const Home = () => {
  return <LandingPage />
}

export default Home
