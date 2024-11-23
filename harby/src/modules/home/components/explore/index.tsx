"use client"
import Carousel from "react-elastic-carousel"
import Image from "next/image"
import Link from "next/link"
import ArrowRight from "@modules/common/icons/arrow-right"

const breakPoints = [
  { width: 640, itemsToShow: 1 },
  // { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1024, itemsToShow: 3 },
]

const explore = [
  { title: "T-Shirt & Cap", bgImage: "/home/explore/Artboard1.png" },
  {
    title: " Supersized & Large Dormet",
    bgImage: "/home/explore/Artboard2.png",
  },
  { title: "Booked cover design", bgImage: "/home/explore/Artboard3.png" },
  { title: "Booked cover design", bgImage: "/home/explore/Artboard4.png" },
]

const Explore = () => {
  return (
    <section className="mt-[100px] md:mx-4">
      <Carousel
        isRTL={false}
        pagination={false}
        enableAutoPlay={true}
        breakPoints={breakPoints}
        className="md:content-container"
      >
        {explore.map((c, index) => (
          <div
            key={index}
            className="h-[280px] w-[350px] rounded-[12px] flex px-6 py-4 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${c.bgImage})` }}
          >
            <div className="flex flex-col justify-between pt-5 pb-2">
              <h3 className="text-[28px] text-[#FFF] font-bold mr-8">
                {c.title}
              </h3>
              <div>
                <Link
                  href="/store"
                  className="transition-all duration-300 group hover:pl-4"
                >
                  <button className="flex items-center rounded-full bg-[#FFF] py-2 px-[26px] shadow">
                    <span className="pr-2">Explore</span>{" "}
                    <ArrowRight className="transition-all duration-300 -rotate-45 group-hover:rotate-0 group-hover:ml-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default Explore
