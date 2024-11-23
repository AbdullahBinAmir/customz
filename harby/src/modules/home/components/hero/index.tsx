// "use client"
// import ArrowRight from "@modules/common/icons/arrow-right"
// import Delivery from "@modules/common/icons/delivery"
// import Gaurantee from "@modules/common/icons/gaurantee"
// import Returns from "@modules/common/icons/return"
// import Support from "@modules/common/icons/support"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import ctaOne from "../../../../../public/cta_one.jpg"

// import hero1 from "../../../../../public/home/hero1.jpg"
// import hero2 from "../../../../../public/home/hero2.jpg"
// import hero3 from "../../../../../public/home/hero3.jpg"

// const Hero = () => {
//   const images = [
//     "https://images.unsplash.com/photo-1716951918731-77d7682b4e63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
//     "https://images.unsplash.com/photo-1716951872043-9ece00ee1d90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
//     "https://images.unsplash.com/photo-1716951984700-64ea15a06f13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
//   ]

//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [fadeIn, setFadeIn] = useState(true)

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setFadeIn(false)

//       setTimeout(() => {
//         setCurrentImageIndex((prevImage) => (prevImage + 1) % images.length)
//         setFadeIn(true)
//       }, 600)
//     }, 4000)

//     return () => clearInterval(intervalId)
//   }, [images.length])

//   return (
//     <>
//       <div className="relative h-[calc(100vh-5.5rem)]">
//         <div
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
//             fadeIn ? "opacity-100" : "opacity-0"
//           }`}
//           style={{
//             backgroundImage: `url(${images[currentImageIndex]})`,
//             zIndex: -1,
//           }}
//         />
//         <div className="content-container grid grid-cols-1 md:grid-cols-2 min-h-[100vh] px-10">
//           <div className="md:self-center text-center md:text-start">
//             <h1 className="text-[26px] md:text-[45px] font-extrabold">
//               Design Your Unique Style with CustomZ
//             </h1>
//             <p className="text-[18px] font-normal text-[#6E6E6E] leading-8 mt-4 md:mt-[35px] text-black">
//               Unleash your creativity and personalize your wardrobe! At CustomZ,
//               you&apos;re the designer. Choose, create, and flaunt your own
//               style. Start crafting your custom apparel today.
//               {/* <br />
//               CustomZ, Your Favorite Mood of Expression.
//               <br />
//               Every moment, every memory—made uniquely yours with CustomZ. */}
//             </p>
//             <div className="flex md:justify-start justify-center">
//               <div>
//                 <Link
//                   href="/store"
//                   className="transition-all duration-300 group hover:pl-4"
//                 >
//                   <button className="flex items-center bg-blue-dark px-16 py-3 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[52px] shadow-sm">
//                     <span className="pr-2">Shop Now</span>
//                     <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           {/* <div className="relative h-[50vh] md:h-[100vh]">
//             <Image src="/hero.png" fill alt="hero" />
//           </div> */}
//         </div>
//       </div>
//       <div className="content-container grid grid-cols-2 md:grid-cols-4 mt-10 md:px-20">
//         <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
//           <Delivery />{" "}
//           <span className="mt-2 md:mt-0 md:ml-3">
//             Free Shipping - All Sizes
//           </span>{" "}
//         </p>
//         <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
//           <Returns />{" "}
//           <span className="mt-2 md:mt-0 md:ml-3">Return and Exchange</span>{" "}
//         </p>
//         <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
//           <Support />{" "}
//           <span className="mt-2 md:mt-0 md:ml-3">
//             High quality - Made in Egypt
//           </span>{" "}
//         </p>
//         <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
//           <Gaurantee />{" "}
//           <span className="mt-2 md:mt-0 md:ml-3">Best Prices</span>{" "}
//         </p>
//       </div>
//     </>
//   )
// }

// export default Hero

"use client"
import ArrowRight from "@modules/common/icons/arrow-right"
import Delivery from "@modules/common/icons/delivery"
import Gaurantee from "@modules/common/icons/gaurantee"
import Returns from "@modules/common/icons/return"
import Support from "@modules/common/icons/support"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import hero1 from "../../../../../public/home/hero1.jpg"
import hero2 from "../../../../../public/home/hero2.jpg"
import hero3 from "../../../../../public/home/hero3.jpg"

const Hero = () => {
  // Array of local images
  // const images = [hero1, hero2, hero3]

  // const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // const [fadeIn, setFadeIn] = useState(true)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setFadeIn(false)

  //     setTimeout(() => {
  //       setCurrentImageIndex((prevImage) => (prevImage + 1) % images.length)
  //       setFadeIn(true)
  //     }, 600)
  //   }, 4000)

  //   return () => clearInterval(intervalId)
  // }, [images.length])

  return (
    <>
      <div className="relative h-[calc(100vh-5.5rem)] ">
        {/* <div
          className={`absolute inset-0 transition-opacity duration-1000 lg:hidden ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            zIndex: -1,
          }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            fill
            style={{ objectFit: "cover", opacity: 0.5 }}
            priority
          />
        </div> */}
        <video
          className=" hidden lg:block absolute   inset-0 object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          style={{ zIndex: -1, opacity: 1 }} // Adjust opacity as needed
        >
          <source src="/home/slider.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          className="md:hidden absolute inset-0 object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ zIndex: -1, opacity: 1 }}
        >
          <source src="/home/sliderx.mp4" type="video/mp4" />
          <source src="/home/sliderx.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <video
          className="lg:hidden hidden md:block absolute   inset-0 object-fill w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          style={{ zIndex: -1, opacity: 1 }} // Adjust opacity as needed
        >
          <source src="/home/slider-tab.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="content-container grid  lg:items-center grid-cols-1 items-end md:grid-cols-2 h-full lg:min-h-[100vh] md:px-10">
          <div className="md:self-end lg:self-center text-center md:text-start">
            <h1 className="text-[26px] hidden lg:block  md:text-[45px] font-extrabold">
              Design Your Unique Style with CustomZ
            </h1>
            <p className="text-[18px] hidden lg:block font-normal leading-8 mt-4 md:mt-[35px] text-black">
              Unleash your creativity and personalize your wardrobe! At CustomZ,
              you&apos;re the designer. Choose, create, and flaunt your own
              style. Start crafting your custom apparel today.
            </p>
            <div className="flex md:justify-start justify-center">
              <div className="hidden lg:flex h-full ">
                <Link
                  href="/store"
                  className="transition-all duration-300 group md:mr-4"
                >
                  <button className="flex items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[32px] shadow-sm">
                    <span className="pr-2 w-28">Shop Now</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
                <Link
                  href={{
                    pathname: "/store",
                    query: { personalizer: true },
                  }}
                  className="transition-all duration-300 group"
                >
                  <button className="flex items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[32px] shadow-sm">
                    <span className="pr-2 w-28">Personalizer</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
              </div>
              <div className="hidden md:flex lg:hidden h-full  mb-44">
                <Link
                  href="/store"
                  className="transition-all duration-300 group md:mr-4"
                >
                  <button className="flex items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[32px] shadow-sm">
                    <span className="pr-2 w-28">Shop Now</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
                <Link
                  href={{
                    pathname: "/store",
                    query: { personalizer: true },
                  }}
                  className="transition-all duration-300 group"
                >
                  <button className="flex items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[32px] shadow-sm">
                    <span className="pr-2 w-28">Personalizer</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
              </div>

              <div className="md:hidden flex flex-col w-full mb-4">
                <Link
                  href="/store"
                  className="transition-all duration-300 groug w-full"
                >
                  <button className="w-full flex justify-center items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-[26px] md:mt-[52px] shadow-sm">
                    <span className="pr-2">Shop Now</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
                <Link
                  href={{
                    pathname: "/store",
                    query: { personalizer: true },
                  }}
                  className="transition-all duration-300 group w-full"
                >
                  <button className="w-full flex justify-center items-center bg-blue-dark px-8 py-2 text-[18px] font-normal leading-8 rounded-full mt-2 md:mt-[52px] shadow-sm">
                    <span className="pr-2">Personalizer</span>
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container grid grid-cols-2 md:grid-cols-4 mt-10 md:px-20">
        <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
          <Delivery />
          <span className="mt-2 md:mt-0 md:ml-3">
            Free Shipping - All Sizes
          </span>
        </p>
        <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
          <Returns />
          <span className="mt-2 md:mt-0 md:ml-3">Return and Exchange</span>
        </p>
        <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
          <Support />
          <span className="mt-2 md:mt-0 md:ml-3">
            High quality - Made in Egypt
          </span>
        </p>
        <p className="flex items-center flex-col md:flex-row text-center md:text-start text-[12px] md:text-[16px] font-normal text-[#000] my-5 md:my-0 justify-center">
          <Gaurantee />
          <span className="mt-2 md:mt-0 md:ml-3">Best Prices</span>
        </p>
      </div>
    </>
  )
}

export default Hero
