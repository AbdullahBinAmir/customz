"use client"

import React, { useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import ProductReviews from "../components/product-reviews"
import SizeGuideModal from "../components/size-guide"

type ProductTemplateProps = {
  product: PricedProduct
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  // useEffect(() => {
  //   const productString = localStorage.getItem("productData")
  //   // Parse the string back into an object
  //   if (productString) {
  //     const productData = JSON.parse(productString)
  //     console.log("Retrieved product data:", productData)
  //   }
  // }, [])
  const info = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const inView = useIntersection(info, "0px")

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
        <div className="flex flex-col gap-y-8 w-full">
          {/* <ImageGallery images={product?.images || []} /> */}
          <ImageGallery product={product || []} />
        </div>
        <div
          className="small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12"
          ref={info}
        >
          <ProductInfo product={product} setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
      <div className="content-container">
        <ProductReviews product={product} />
      </div>
      <div className="content-container my-16 px-6 small:px-8 small:my-32">
        <RelatedProducts product={product} />
      </div>
      <MobileActions
        product={product}
        show={!inView}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-1">
              <button
                onClick={() => setIsModalOpen(false)}
                className="float-right text-gray-500 hover:text-gray-700 mr-6 mt-4"
              >
                ✕
              </button>
              <SizeGuideModal productId={product.id} />
            </div>
          </div>
        </div>
      )}
    </ProductProvider>
  )
}

export default ProductTemplate
