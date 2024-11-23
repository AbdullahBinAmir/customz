import { Image as MedusaImage } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Spinner from "@modules/common/icons/spinner"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
// type ImageGalleryProps = {
//   images: MedusaImage[]
// }
type ProductTemplateProps = {
  product: PricedProduct
}

const IS_SERVER = typeof window === "undefined"
const CUSTOMIZED_URL = "customizedURL"
const CUSTOMIZED_PRODUCT_DATA = "customizerProps"

const getCustomizerProductData = () => {
  if (!IS_SERVER) {
    return localStorage.getItem(CUSTOMIZED_PRODUCT_DATA)
  }
  return null
}

const getCustomizedURL = () => {
  if (!IS_SERVER) {
    return localStorage.getItem(CUSTOMIZED_URL)
  }
  return null
}

// const ImageGallery = ({ images }: ImageGalleryProps) => {
const ImageGallery = ({ product }: ProductTemplateProps) => {
  const [imageUrl, setImageUrl] = useState("")
  const [customizedImageUrl, setCustomizedImageUrl] = useState("")
  const [customizedProductHandle, setCustomizedProductHandle] = useState("")

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const getCustomizedData = async () => {
    const customizedData = await getCustomizerProductData()
    if (customizedData) {
      const info = JSON.parse(customizedData)
      setCustomizedProductHandle(info.handle)
    }
  }

  useEffect(() => {
    getCustomizedData()

    const customizedURL = getCustomizedURL()
    if (customizedURL) {
      setCustomizedImageUrl(customizedURL)
    }
    // setImageUrl(images[0].url)
    if (product && product.images) {
      setImageUrl(product?.images[0]?.url)
    }
  }, [])

  return (
    <>
      {!customizedProductHandle || !product.images?.length ? (
        <div className="flex mt-44 mx-auto">
          <Spinner size={24} />
        </div>
      ) : (
        <div>
          {product?.handle === customizedProductHandle ? (
            // <div className="flex items-start relative">
            //   <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
            <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
              <div className="relative aspect-[2/3] w-full rounded-[20px]">
                {/* <Image src={customizedImageUrl} fill alt="" /> */}
                <Image
                  src={customizedImageUrl}
                  // className="absolute inset-0 p-3"
                  alt="product image"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-start relative">
              <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
                {/* {images.map((image, index) => { */}
                {product?.images?.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      className="w-24 h-32 relative border border-white rounded-[20px]"
                      onClick={() => {
                        setImageUrl(image.url)
                        handleScrollTo(image.id)
                      }}
                    >
                      <span className="sr-only">Go to image {index + 1}</span>
                      <Image
                        src={image.url}
                        className="absolute inset-0"
                        alt="Thumbnail"
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
                {/* {images.map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image.id}
              className="relative aspect-[29/34] w-full bg-[#F2F4F5] rounded-[20px]"
              id={image.id}
            > */}
                <div
                  // ref={(image) => imageRefs.current.push(image)}
                  // key={image.id}
                  // className="relative aspect-[29/34] w-full bg-[#F2F4F5] rounded-[20px]"
                  className="relative aspect-[2/3] w-full rounded-[20px]"
                  // id={image.id}
                >
                  <Image
                    src={imageUrl}
                    // priority={index <= 2 ? true : false}
                    className="absolute inset-0"
                    // alt={`Product image ${index + 1}`}
                    alt="product image"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                {/* </div>
          )
        })} */}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageGallery
