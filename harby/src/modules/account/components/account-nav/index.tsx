import { useAccount } from "@lib/context/account-context"
import Addresses from "@modules/common/icons/adresses"
import Cart from "@modules/common/icons/cart"
import ChevronDown from "@modules/common/icons/chevron-down"
import Dashboard from "@modules/common/icons/dashboard"
import Logout from "@modules/common/icons/logout"
import User from "@modules/common/icons/user"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()

  return (
    <div>
      <div className="small:hidden">
        {route !== "/account" && (
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="py-4">
            <h3 className="text-[18px] font-semibold">Account</h3>
          </div>
          <div className="text-[16px] text-[#6F6F6F] font-normal">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li className="w-full">
                <AccountNavLink href="/account" route={route!}>
                <span>Dashboard</span> <Dashboard />
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink href="/account/profile" route={route!}>
                <span>Profile</span> <User size={25} />
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink href="/account/addresses" route={route!}>
                <span>Addresses</span> <Addresses size={23} />
                </AccountNavLink>
              </li>
              <li className="w-full">
                <AccountNavLink href="/account/orders" route={route!}>
                  <span>Orders</span> <Cart size={25} />
                </AccountNavLink>
              </li>
              <li className="text-grey-700 w-full">
                <button type="button" onClick={handleLogout} className=" w-full flex">
                  <span className="mr-[6.4rem]">Log out</span> <Logout  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <>
      <Link
        href={href}
        // className={clsx("text-gray-700", {
        //   "text-gray-900 font-semibold": active,
        // })}
        className={clsx("text-gray-700 flex justify-between mr-16", {
          "text-[#8ee0eb] font-semibold": active,
        })}
      >
        <>{children}</>
      </Link>
      <hr className="mr-16 mt-5" />
    </>
  )
}

export default AccountNav
