"use client"
import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Subscribe from "@modules/home/components/subscribe"
import BestSeller from "@modules/home/components/best-seller"
import Testimonial from "@modules/home/components/testimonial"
import PrintCategory from "@modules/home/components/category"
import DiscoverIdeas from "@modules/home/components/discover-ideas"
import Deals from "@modules/home/components/deals"
import Explore from "./components/explore"
import PaymentButton from "@modules/checkout/components/payment-button"
import { Rating } from "react-simple-star-rating"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop all available models only at the CustomZ. Worldwide Shipping. Secure Payment.",
}

const Home = () => {
  return (
    <>
      <Hero />
      <Explore />
      <FeaturedProducts />
      {/* <BestSeller /> */}
      {/* <Deals /> */}
      <DiscoverIdeas />
      {/* <PrintCategory /> */}
      {/* <Testimonial /> */}
      <Subscribe />
    </>
  )
}

export default Home
