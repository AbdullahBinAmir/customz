import { Fragment, useEffect, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { useCartDropdown } from "@lib/context/cart-dropdown-context"
import { useStore } from "@lib/context/store-context"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import Button from "@modules/common/components/button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Cart from "@modules/common/icons/cart"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount, useCart } from "medusa-react"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import Medusa from "@medusajs/medusa-js"
import Link from "next/link"
import { toast } from "react-toastify"

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const CUSTOMIZED_PRODUCT_DATA = "customizerProps"
const INVENTORY_QTY = "inventory_quantity"

const getCustomizerProductData = () => {
  if (!IS_SERVER) {
    return localStorage.getItem(CUSTOMIZED_PRODUCT_DATA)
  }
  return null
}

const getCartId = () => {
  if (!IS_SERVER) {
    console.log(localStorage.getItem(CART_KEY))
    return localStorage.getItem(CART_KEY)
  }
  return null
}

const getInventoryQty = () => {
  if (!IS_SERVER) {
    return localStorage.getItem(INVENTORY_QTY)
  }
}

const CartDropdown = () => {
  const { cart, totalItems } = useCart()
  const items = useEnrichedLineItems()
  const { deleteItem } = useStore()
  const { state, open, close } = useCartDropdown()

  const [customizedURL, setCustomizedURL] = useState("")
  const [customizedProductTitle, setCustomizedProductTitle] = useState("")
  const [inventoryQty, setInventoryQty] = useState(0)

  // useEffect(() => {
  //   let countItems = 0
  //   if (countItems !== totalItems) {
  //     toast.success("Cart added successfully")
  //     countItems + 1
  //   }
  // }, [totalItems])

  useEffect(() => {
    const inventoryQty = getInventoryQty()
    if (inventoryQty) {
      const qty = JSON.parse(inventoryQty)
      setInventoryQty(qty)
      if (totalItems === qty) {
        toast.warning("Out of stock")
      }
    }
  }, [totalItems, inventoryQty])

  useEffect(() => {
    const cartId = getCartId()

    const customizedData = getCustomizerProductData()
    if (customizedData) {
      const info = JSON.parse(customizedData)
      setCustomizedProductTitle(info.title)
    }

    const getCustomizedUrl = async () => {
      try {
        if (cartId !== null) {
          const medusa = new Medusa({
            baseUrl: MEDUSA_BACKEND_URL,
            maxRetries: 3,
          })

          const { cart } = await medusa.carts.retrieve(cartId)
          setCustomizedURL(cart?.context?.customizedURL as string)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getCustomizedUrl()
  }, [])

  function truncateString(str: string, maxLength: number) {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str
  }

  return (
    <div className="h-full z-50" onMouseEnter={open} onMouseLeave={close}>
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          {/* <Link href="/cart">{`My Bag (${totalItems})`}</Link> */}
          <Link href="/cart">
            <div className="flex relative">
              <Cart size={25} />
              <span className="absolute top-[-9px] right-[-8px] rounded-full text-white bg-[#000000] px-[7px] pt-[2px]">
                {totalItems}
              </span>
            </div>
          </Link>
        </Popover.Button>
        <Transition
          show={state}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-gray-200 w-[450px] text-gray-900"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Shopping Bag</h3>
            </div>
            {cart && items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                      >
                        <div className="w-[122px]">
                          {/* {customizedURL ? ( */}
                          {item?.title === customizedProductTitle ? (
                            <Thumbnail
                              thumbnail={customizedURL}
                              size="full"
                              customizedURL={true}
                            />
                          ) : (
                            <Thumbnail thumbnail={item.thumbnail} size="full" />
                          )}
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap w-[130px]">
                                  <Link
                                    href={`/products/${item.variant.product.handle}`}
                                    legacyBehavior
                                  >
                                    {truncateString(item.title, 15)}
                                  </Link>
                                </h3>
                                <LineItemOptions variant={item.variant} />
                                <span>Quantity: {item.quantity}</span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cart.region}
                                  item={item}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-end justify-between text-small-regular flex-1">
                            <div>
                              <button
                                className="flex items-center gap-x-1 text-gray-500"
                                onClick={() => {
                                  deleteItem(item.id)
                                  setCustomizedURL("")
                                }}
                              >
                                <Trash size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(incl. taxes)</span>
                    </span>
                    <span className="text-large-semi">
                      {formatAmount({
                        amount: cart.subtotal || 0,
                        region: cart.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <Link href="/cart" passHref>
                    <Button variant="custom-address">Go to bag</Button>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <Link href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <button
                          onClick={close}
                          className="bg-blue-dark text-sm px-6 py-2 rounded-full"
                        >
                          Explore products
                        </button>
                      </>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
