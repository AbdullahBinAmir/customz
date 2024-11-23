import { useEffect, useState } from "react"
import Medusa from "@medusajs/medusa-js"
import { useStore } from "@lib/context/store-context"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import NativeSelect from "@modules/common/components/native-select"
import Trash from "@modules/common/icons/trash"
import Thumbnail from "@modules/products/components/thumbnail"
import { MEDUSA_BACKEND_URL } from "@lib/config"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const IS_SERVER = typeof window === "undefined"
const CART_KEY = "medusa_cart_id"
const CUSTOMIZED_PRODUCT_DATA = "customizerProps"

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

const Item = ({ item, region }: ItemProps) => {
  const { updateItem, deleteItem } = useStore()
  const [customizedURL, setCustomizedURL] = useState("")
  const [customizedProductTitle, setCustomizedProductTitle] = useState("")

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

  return (
    <>
      {/* <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="w-[122px]">
          <Thumbnail thumbnail={item.thumbnail} size="full" />
        </div>
        <div className="text-base-regular flex flex-col gap-y-8">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span>{item.title}</span>
              <LineItemOptions variant={item.variant} />
            </div>
            <NativeSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="max-h-[35px] w-[75px]"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  )
                })}
            </NativeSelect>
          </div>
          <div className="flex items-end justify-between text-small-regular flex-1">
            <div>
              <button
                className="flex items-center gap-x-1 text-gray-500"
                onClick={() => deleteItem(item.id)}
              >
                <Trash size={14} />
                <span>Remove</span>
              </button>
            </div>
            <div>
              <LineItemPrice item={item} region={region} />
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-[122px_1fr] gap-x-4">
        <div className="w-40 small:w-[122px]">
          {/* {customizedURL ? ( */}
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
        <div className="flex flex-col justify-between items-center sm:flex-row">
          <div>
            <span>{item.title}</span>
            <LineItemOptions variant={item.variant} />
          </div>
          <div>
            <NativeSelect
              value={item.quantity}
              onChange={(value) =>
                updateItem({
                  lineId: item.id,
                  quantity: parseInt(value.target.value),
                })
              }
              className="max-h-[35px] w-[75px]"
            >
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0
                      ? item.variant.inventory_quantity
                      : 0
                  ),
                ].keys()
              )
                // .slice(0, 10)
                .map((i) => {
                  const value = i + 1
                  return (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  )
                })}
            </NativeSelect>
          </div>
          <div>
            <LineItemPrice item={item} region={region} />
          </div>
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
    </>
  )
}

export default Item
