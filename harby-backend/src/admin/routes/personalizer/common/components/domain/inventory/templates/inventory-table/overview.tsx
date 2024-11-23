import { Product } from "@medusajs/medusa"
import clsx from "clsx"
import { Link } from "react-router-dom"
import useProductActions from "./use-inventory-actions"
import ListIcon from "../../../../fundamentals/icons/list-icon"
import TileIcon from "../../../../fundamentals/icons/tile-icon"
import Actionables from "../../../../molecules/actionables"
import Button from "../../../../fundamentals/button"
import MoreHorizontalIcon from "../../../../fundamentals/icons/more-horizontal-icon"
import ImagePlaceholder from "../../../../fundamentals/image-placeholder"

type ProductOverviewProps = {
  products?: Product[]
  toggleListView: () => void
}

const InventoryOverview = ({
  products,
  toggleListView,
}: ProductOverviewProps) => {
  return (
    <>
      <div className="border-grey-20 pr-xlarge flex justify-end border-t border-b py-2.5">
        <div className="inter-small-semibold text-grey-50 flex justify-self-end">
          <span
            onClick={toggleListView}
            className={clsx(
              "hover:bg-grey-5 text-grey-40 cursor-pointer rounded p-0.5"
            )}
          >
            <ListIcon size={20} />
          </span>
          <span
            className={clsx(
              "hover:bg-grey-5 text-grey-90 cursor-pointer rounded p-0.5"
            )}
          >
            <TileIcon size={20} />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6">
        {products?.map((product) => (
          <ProductTile product={product} />
        ))}
      </div>
    </>
  )
}

const ProductTile = ({ product }) => {
  const { getActions } = useProductActions(product)

  return (
    <div className="p-base rounded-rounded hover:bg-grey-5 group flex-col">
      <div className="relative">
        <div
          className={clsx("rounded-base absolute top-2 right-2 inline-block")}
        >
          <Actionables
            actions={getActions()}
            customTrigger={
              <Button
                variant="ghost"
                size="small"
                className="w-xlarge h-xlarge hidden-actions bg-grey-0 opacity-0 focus-within:opacity-100 group-hover:opacity-100"
              >
                <MoreHorizontalIcon size={20} />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default InventoryOverview
