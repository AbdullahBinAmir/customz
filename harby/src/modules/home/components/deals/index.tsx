import ArrowRight from "@modules/common/icons/arrow-right"
import Image from "next/image"
import Link from "next/link"

const counter = [
  { id: 1, d: "Days", dCount: "24" },
  { id: 2, d: "Hrs", dCount: "22" },
  { id: 3, d: "Muns", dCount: "16" },
  { id: 4, d: "Secs", dCount: "33" },
]

const Deals = () => {
  return (
    <section className="bg-[#EEFDFF] md:px-[156px] py-0 mt-[65px] md:py-14 min-h-[100vh]">
      <div className="content-container grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[600px]">
          <Image src="/home/deals/1.png" fill alt="deals of the week" />
        </div>
        <div className="md:pl-[150px] py-12 md:py-28">
          <p className="text-[#000000] text-[16px] font-normal leading-6">
            100% Best selling
          </p>
          <h3 className="text-[#000] text-[30px] font-semibold my-5">
            Deals of the week never miss!
          </h3>
          <p className="text-[#000] text-[16px] font-normal leading-6">
            Hot Price: <span className="text-[#000000]">$349.0</span>
          </p>
          <div className="flex mt-[45px]">
            {counter.map((c) => (
              <div key={c.id} className="flex flex-col items-center mr-6">
                <span className="h-[50px] w-[50] bg-[#FFF] rounded-full p-4">
                  {c.dCount}
                </span>
                <p className="mt-3 text-[16px] text-[#000] font-normal leading-6">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/store"
            className="transition-all duration-300 group hover:pl-4 hover:pr-1"
          >
            <button className="flex items-center bg-blue-dark text-[#000] px-[48px] py-3 mt-[70px] rounded-full">
              <span className="pr-2">Shop Now</span>{" "}
              <ArrowRight className="transition-all group-hover:ml-2 duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Deals
