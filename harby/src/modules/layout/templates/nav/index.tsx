"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import User from "@modules/common/icons/user"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

const Nav = () => {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    // <div
    // // className={clsx("sticky top-0 inset-x-0 z-50 group", {
    // //   "!fixed": isHome,
    // // })}
    // >
    <header
      // className={clsx(
      //   "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
      //   {
      //     "!bg-white !border-gray-200": !isHome || isScrolled,
      //   }
      // )}
      className="h-[5.5rem] md:px-8 mx-auto bg-blue-dark"
    >
      <nav
        // className={clsx(
        //   "content-container text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
        //   {
        //     "text-white group-hover:text-gray-900": isHome && !isScrolled,
        //   }
        // )}
        className="content-container flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200"
      >
        <div className="flex-1 basis-0 h-full flex items-center">
          <div className="block small:hidden">
            <Hamburger setOpen={toggle} />
          </div>
          <div className="hidden small:block">
            {/* <DropdownMenu /> */}
            <Link href="/" className="relative">
              <Image
                src="/customz.png"
                width={130}
                height={59}
                // fill
                alt="customz logo"
                // className=" object-cover"
              />
            </Link>
          </div>
        </div>
        <div className=" block small:hidden">
          {/* <DropdownMenu /> */}
          <Link href="/" className="relative">
            <Image
              src="/customz.png"
              width={130}
              height={59}
              // fill
              alt="customz logo"
              // className=" object-cover"
            />
          </Link>
        </div>

        {/* <Link href="/" className={pathname == "/" ? "text-[#070707]" : "text-[#404042]"}>
            Home
          </Link> */}
        <div className="hidden small:flex items-center h-full">
          <Link
            href="/"
            className={`text-[18px] font-medium leading-7 ${
              pathname == "/"
                ? "text-[#070707] border-[#070707] border-b-2 p-0 mx-4"
                : "text-[#595959] p-4"
            }`}
          >
            Home
          </Link>
          <Link
            href="/store"
            className={`text-[18px] font-medium leading-7 ${
              pathname == "/store"
                ? "text-[#070707] border-[#070707] border-b-2 p-0 mx-4"
                : "text-[#595959] p-4"
            }`}
          >
            Shop
          </Link>
          <Link
            href="/bulk-order"
            className={`text-[18px] font-medium leading-7 ${
              pathname == "/bulk-order"
                ? "text-[#070707] border-[#070707] border-b-2 p-0 mx-4"
                : "text-[#595959] p-4"
            }`}
          >
            Bulk Order
          </Link>
          <Link
            href="/about"
            className={`text-[18px] font-medium leading-7 ${
              pathname == "/about"
                ? "text-[#070707] border-[#070707] border-b-2 p-0 mx-4"
                : "text-[#595959] p-4"
            }`}
          >
            About us
          </Link>
        </div>

        <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
          <div className="hidden small:flex items-center gap-x-6 h-full">
            {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
            <Link href="/account">
              <User size={25} />
            </Link>
          </div>
          <CartDropdown />
        </div>
      </nav>
      <MobileMenu />
    </header>
    // </div>
  )
}

export default Nav