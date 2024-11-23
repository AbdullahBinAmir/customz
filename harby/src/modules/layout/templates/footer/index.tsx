// import FooterCTA from "@modules/layout/components/footer-cta"
// import FooterNav from "@modules/layout/components/footer-nav"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

// const Footer = () => {
//   return (
//     <footer>
//       <FooterCTA />
//       <FooterNav />
//       <MedusaCTA />
//     </footer>
//   )
// }

// export default Footer
import ArrowRight from "@modules/common/icons/arrow-right"
import Facebook from "@modules/common/icons/fb"
import Instagram from "@modules/common/icons/insta"
import Twitter from "@modules/common/icons/twitter"
import Youtube from "@modules/common/icons/youtube"
import FooterCTA from "@modules/layout/components/footer-cta"
import FooterNav from "@modules/layout/components/footer-nav"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import Link from "next/link"
import location from "../../../../../public/location.png"

// const information = [
//   { link: '/return-policy', title: "help center" },
//   { link: '/return-policy', title: "help center" },
// ]

const Footer = () => {
  return (
    <footer className="content-container bg-blue-dark">
      {/* <FooterCTA />
      <FooterNav />
      <MedusaCTA /> */}
      <div className="md:content-container text-center md:text-start grid grid-cols-1 md:grid-cols-3 gap-12 md:px-[71px] pt-[48px] pb-10 md:pb-[100px]">
        <div className="text-center md:text-start">
          <div className="relative flex justify-center md:justify-start -mt-6">
            <Link href="/">
              <Image
                src="/customz.png"
                width={130}
                height={59}
                alt="CustomZ logo"
              />
            </Link>
          </div>
          <div className="">
            <p className="text-[16px] font-normal leading-[24px] lg:pl-3.5">
              Every moment, every memory—made uniquely yours with CustomZ.
            </p>
          </div>
          <div className="flex justify-center md:justify-start mt-6 lg:pl-3">
            <Link
              href="https://www.instagram.com/customz.eg?igsh=MTJ3NmVvOTM0amFyaw=="
              target="blank"
            >
              <div className="h-[35px] w-[35px] rounded-full border border-[#434343] flex justify-center items-center mx-1">
                <Instagram
                  size={8}
                  className="transition-all group-hover:ml-2 duration-300"
                />
              </div>
            </Link>
            <Link href="https://www.facebook.com" target="blank">
              <div className="h-[35px] w-[35px] rounded-full border border-[#434343] flex justify-center items-center mx-1">
                <Facebook
                  size={8}
                  className="transition-all group-hover:ml-2 duration-300"
                />
              </div>
            </Link>
            {/* <Link href="https://www.twitter.com" target="blank">
              <div className="h-[35px] w-[35px] rounded-full border border-[#434343] flex justify-center items-center mx-1">
                <Twitter
                  size={8}
                  className="transition-all group-hover:ml-2 duration-300"
                />
              </div>
            </Link> */}
            {/* <Link href="https://www.youtube.com" target="blank">
              <div className="h-[35px] w-[35px] rounded-full border border-[#434343] flex justify-center items-center mx-1">
                <Youtube
                  size={8}
                  className="transition-all group-hover:ml-2 duration-300"
                />
              </div>
            </Link> */}
          </div>
        </div>
        <div className="text-center md:text-start">
          <h3 className="text-[20px] text-[#2C3E50] leading-[30px] font-medium mb-5">
            Get In Touch
          </h3>

          <p className="flex items-start max-md:justify-center gap-2 text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin w-5 h-5 lg:w-8 lg:h-8"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="hidden md:block">
              Green plaza street Almezaneen tower apartment 1, Alexandria, Egypt
            </p>
            <span className="md:hidden">Green plaza street Almezaneen</span>
          </p>
          <p className="text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal my-2 md:hidden">
            tower apartment 1, Alexandria, Egypt
          </p>

          <p className="flex items-center max-md:justify-center gap-2 text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <Link href="mailto:support@customz.shop">support@customz.shop</Link>
          </p>
          <p className="flex items-center max-md:justify-center gap-2 text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-phone"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <Link href="tel:+20 100 006 2247">+20 100 006 2247</Link>
          </p>
        </div>
        <div className="flex justify-evenly">
          {/* <div>
            <h3 className="text-[20px] text-[#2C3E50] leading-[30px] font-normal mb-6">
              Information
            </h3>
            {information.map((i, index) => (
              <p
                className="text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal mb-4"
                key={index}
              >
                {i}
              </p>
            ))}
          </div> */}
          <div>
            <h3 className="text-[20px] text-[#2C3E50] leading-[30px] font-semibold mb-6">
              Information
            </h3>
            <div className="flex flex-col">
              <Link
                href="/privacy-policy"
                className="text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal mb-3 hover:underline"
              >
                Privacy and exchange Policy
              </Link>
              <Link
                href="/return-policy"
                className="text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal mb-3 hover:underline"
              >
                Return and exchange Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-[16px] text-[#2C3E50] font-normal leading-6 tracking-normal mb-3 hover:underline"
              >
                Terms of use
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <p className="text-[16px] leading-6 font-normal text-center pb-[54px]">
        Copyright © 2023 CustomZ. All rights reserved
      </p> */}
    </footer>
  )
}

export default Footer
