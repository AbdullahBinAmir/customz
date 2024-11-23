import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductReviews = ({ product }: ProductTabsProps) => {
  console.log(product)
  return (
    <TabGroup className="mt-6">
      {/* <TabList className="flex gap-4">
        <Tab className="text-[#6F6F6F] data-[selected]:text-black data-[selected]:outline-none data-[selected]:border-b-blue-dark border-b-transparent border-b-2 pb-2 text-2xl leading-6 font-medium">
          Reviews
        </Tab>
      </TabList>
      <TabPanels className="mt-4">
        <TabPanel>Reviews will go here</TabPanel>
      </TabPanels> */}
    </TabGroup>
  )
}

export default ProductReviews
