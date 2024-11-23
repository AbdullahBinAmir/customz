// import clsx from "clsx"
// import Link from "next/link"
// import { ProductPreviewType } from "types/global"
// import Thumbnail from "../thumbnail"

// const ProductPreview = ({
//   title,
//   handle,
//   thumbnail,
//   price,
// }: ProductPreviewType) => {
//   return (
//     <Link href={`/products/${handle}`}>
//       <div>
//         <Thumbnail thumbnail={thumbnail} size="full" />
//         <div className="mt-2">
//           <p className="text-[20px] text[#000000] font-normal leading-6">{title}</p>
//           <div className="flex items-center gap-x-2 mt-1">
//             {price ? (
//               <>
//                 {price.price_type === "sale" && (
//                   <span className="text-[20px] text[#000000] font-bold leading-6">
//                     {price.original_price}
//                   </span>
//                 )}
//                 <span
//                   className={clsx("ftext-[20px] text[#000000] font-bold leading-6", {
//                     "text-rose-500": price.price_type === "sale",
//                   })}
//                 >
//                   {price.calculated_price}
//                 </span>
//               </>
//             ) : (
//               <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default ProductPreview

import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import Image from "next/image"
import { Rating } from "react-simple-star-rating"

// interface CustomProductPreviewProps {
//   name: string
//   icons: []
// }

// interface ExtendedProductPreviewType
//   extends ProductPreviewType,
//     CustomProductPreviewProps {}

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  rating,
  images,
  isPersonalizer,
  isEmroidery,
  isPrinting,
}: // }: ExtendedProductPreviewType) => {
ProductPreviewType) => {
  const handleCustomzerProps = async () => {
    const customizerProps = {
      title: title,
      handle: handle,
      thumbnail: thumbnail,
      // icons: icons,
      icons: images,
      price: price,
      isEmroidery: isEmroidery,
      isPrinting: isPrinting,
    }

    await localStorage.setItem(
      "customizerProps",
      JSON.stringify(customizerProps)
    )
  }
  return (
    <>
      {/* {handle === "customizer" ? ( */}
      {isPersonalizer && isPersonalizer !== undefined ? (
        <Link href={`/customizer`} onClick={handleCustomzerProps}>
          <div className="relative group rounded-t-[20px] mb-12">
            <Thumbnail thumbnail={thumbnail} size="full" />
            <div className="mt-2">
              <p className="text-sm md:text-[20px] text[#000000] font-normal leading-6 text-center">
                {title}
              </p>
              <div className="flex items-center justify-center gap-x-2 mt-1">
                {price ? (
                  <>
                    {price.price_type === "sale" && (
                      <span className="text-sm md:text-[20px] text[#000000] font-bold leading-6">
                        {price.original_price}
                      </span>
                    )}
                    <span
                      className={clsx(
                        "text-sm md:text-[20px] text[#000000] font-bold leading-6",
                        {
                          "text-rose-500": price.price_type === "sale",
                        }
                      )}
                    >
                      {price.calculated_price}
                    </span>
                  </>
                ) : (
                  <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                )}
              </div>
            </div>
            <div className="flex justify-center group-hover:hidden text-center mt-2">
              <Rating
                readonly
                initialValue={rating}
                size={25}
                SVGstyle={{ display: "inline-block" }}
              />
            </div>
            <div className="absolute hidden group-hover:flex bg-white rounded-b-[20px] w-full p-4 bottom-0 left-0 transform translate-y-full">
              <div className="flex justify-center w-full">
                <Link href="/customizer">
                  <button className="bg-blue-dark px-9 py-2 rounded-full text-center">
                    Personalization
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        // <Link href={`/products/${handle}`}>
        //   <div>
        //     <Thumbnail thumbnail={thumbnail} size="full" />
        //     <div className="mt-2">
        //       <p className="text-[20px] text[#000000] font-normal text-center leading-6">
        //         {title}
        //       </p>
        //       <div className="flex items-center justify-center gap-x-2 mt-1">
        //         {price ? (
        //           <>
        //             {price.price_type === "sale" && (
        //               <span className="text-[20px] text[#000000] font-bold leading-6">
        //                 {price.original_price}
        //               </span>
        //             )}
        //             <span
        //               className={clsx(
        //                 "ftext-[20px] text[#000000] font-bold leading-6",
        //                 {
        //                   "text-rose-500": price.price_type === "sale",
        //                 }
        //               )}
        //             >
        //               {price.calculated_price}
        //             </span>
        //           </>
        //         ) : (
        //           <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
        //         )}
        //       </div>
        //       <div className="text-center mt-2">
        //         <Rating
        //           readonly
        //           initialValue={rating}
        //           size={25}
        //           SVGstyle={{ display: "inline-block" }}
        //         />
        //       </div>
        //     </div>
        //   </div>
        // </Link>
        <Link href={`/products/${handle}`}>
          <div className="relative group hover:bg-white rounded-t-[20px] mb-12">
            <Thumbnail thumbnail={thumbnail} size="full" />

            <div className="mt-2">
              <p className="text-sm md:text-[20px] text[#000000] font-normal leading-6 text-center">
                {title}
              </p>
              <div className="flex items-center justify-center gap-x-2 mt-1">
                {price ? (
                  <>
                    {price.price_type === "sale" && (
                      <span className="text-sm md:text-[20px] text[#000000] font-bold leading-6">
                        {price.original_price}
                      </span>
                    )}
                    <span
                      className={clsx(
                        "text-sm md:text-[20px] text[#000000] font-bold leading-6",
                        {
                          "text-rose-500": price.price_type === "sale",
                        }
                      )}
                    >
                      {price.calculated_price}
                    </span>
                  </>
                ) : (
                  <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                )}
              </div>
            </div>
            <div className="flex justify-center group-hover:hidden text-center mt-2">
              <Rating
                readonly
                initialValue={rating}
                size={25}
                SVGstyle={{ display: "inline-block" }}
              />
            </div>
            <div className="absolute hidden group-hover:flex bg-white rounded-b-[20px] w-full p-4 bottom-0 left-0 transform translate-y-full">
              <div className="flex justify-center w-full">
                <button className="bg-blue-dark text-sm px-4 md:px-9 py-2 rounded-full text-center">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default ProductPreview
