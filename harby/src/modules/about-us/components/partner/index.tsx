"use client"
import Image from "next/image"
import Marquee from "react-fast-marquee"

const index = () => {
  return (
    <section className="mt-36 text-center">
      <p className="text-[#48C0D0] text-[16px]">Our Trusted Partners</p>
      <h1 className="text-[#000000] text-[40px] font-semibold mt-2 mb-10">
        We are trusted by our partners
      </h1>
      <div className="flex justify-between md:px-20">
        <Marquee pauseOnHover gradient gradientColor="#f6feff" speed={30}>
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
          <Image
            src={"/contact/devstarx.png"}
            width={120}
            height={80}
            alt=""
            className="mx-4"
          />
        </Marquee>
      </div>
    </section>
  )
}

export default index
