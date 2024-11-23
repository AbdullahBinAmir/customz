import UnderlineLink from "@modules/common/components/underline-link"
import ArrowRight from "@modules/common/icons/arrow-right"
import Link from "next/link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-[#ACE7EF33] px-8 py-24 flex flex-col justify-center items-center text-center rounded-b-lg">
      <h1 className="text-2xl-semi">Your shopping bag is empty</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        You don&apos;t have anything in your bag. Let&apos;s change that, use
        the link below to start browsing our products.
      </p>
      <div>
        <div>
          <Link
            href="/store"
            className="transition-all duration-300 group hover:pl-4 hover:pr-1"
          >
            <button className="flex items-center bg-blue-dark px-8 py-2 text-[16px] font-normal rounded-full mt-[26px] md:mt-[52px]">
              <span className="pr-2">Shop Now</span>{" "}
              <ArrowRight className="transition-all group-hover:ml-2 duration-300" />
            </button>
          </Link>
        </div>
        {/* <UnderlineLink href="/store">Explore products</UnderlineLink> */}
      </div>
    </div>
  )
}

export default EmptyCartMessage
