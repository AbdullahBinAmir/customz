import { useEffect, useState } from "react"
import Medusa from "@medusajs/medusa-js"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Link from "next/link"
import { MEDUSA_BACKEND_URL } from "@lib/config"

type ItemsProps = {
  items: LineItem[]
  region: Region
  cartId: string
}

const IS_SERVER = typeof window === "undefined"
const CUSTOMIZED_PRODUCT_DATA = "customizerProps"

const getCustomizerProductData = () => {
  if (!IS_SERVER) {
    return localStorage.getItem(CUSTOMIZED_PRODUCT_DATA)
  }
  return null
}

const Items = ({ items, region, cartId }: ItemsProps) => {
  const enrichedItems = useEnrichedLineItems(items, cartId)

  const [customizedURL, setCustomizedURL] = useState("")
  const [customizedProductTitle, setCustomizedProductTitle] = useState("")

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

  useEffect(() => {
    const customizedData = getCustomizerProductData()
    if (customizedData) {
      const info = JSON.parse(customizedData)
      setCustomizedProductTitle(info.title)
    }

    getCustomizedUrl()
  }, [])

  return (
    <div className="p-10 border-b border-gray-200 gap-y-4 flex flex-col">
      {enrichedItems?.length
        ? enrichedItems.map((item) => {
            return (
              <div
                className="grid grid-cols-[122px_1fr] items-center gap-x-4"
                key={item.id}
              >
                <div className="w-[122px]">
                  {item.title === customizedProductTitle ? (
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
                  <div className="flex flex-col flex-1 text-small-regular">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4">
                          <Link
                            href={`/products/${item.variant.product.handle}`}
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <LineItemOptions variant={item.variant} />
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <div className="flex justify-end">
                        <LineItemPrice region={region} item={item} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : Array.from(Array(items.length).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default Items
