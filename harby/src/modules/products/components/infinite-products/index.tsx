import { fetchProductsList } from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { StoreGetProductsParams } from "@medusajs/medusa"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"

type InfiniteProductsType = {
  params: StoreGetProductsParams
}

// type personalizerProps = {
//   thumbnail: string
//   name: string
// }

const InfiniteProducts = ({ params }: InfiniteProductsType) => {
  const [personalizerData, setPersonalizerData] = useState<any>([])

  const { cart } = useCart()

  const { ref, inView } = useInView()

  const queryParams = useMemo(() => {
    const p: StoreGetProductsParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params])

  // Old code for multiple collection selection
  // const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
  //   useInfiniteQuery(
  //     [`infinite-products-store`, queryParams, cart],
  //     ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextPage,
  //     }
  //   )

  // new code for single collection selection
  const queryKey = useMemo(
    () => [`infinite-products-store`, queryParams, cart?.id],
    [queryParams, cart?.id]
  )

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages, region: cart?.region })

  // const fetchPersonalizer = async () => {
  //   try {
  //     const path = "http://localhost:9000/store/custom/getPersonalizer"
  //     const res = await axios.get(path)
  //     if (res.status === 200) {
  //       setPersonalizerData(res.data.data)
  //     }
  //   } catch (error) {
  //     console.error("Error", error)
  //   }
  // }

  // useEffect(() => {
  //   fetchPersonalizer()
  // }, [])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  // const mergedPreviews = useMemo(() => {
  //   const flattenedPersonalizerData = personalizerData.flat() || []
  //   return [...flattenedPersonalizerData, ...previews]
  // }, [previews, personalizerData])
  // console.log("mergedPreviews :", mergedPreviews)

  return (
    <div className="flex-1 content-container">
      {previews.length > 0 || isLoading ? (
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
          {previews.map((p) => (
            <li key={p.id}>
              <ProductPreview {...p} />
            </li>
          ))}
          {isLoading &&
            !previews.length &&
            repeat(8).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))}
          {isFetchingNextPage &&
            repeat(getNumberOfSkeletons(data?.pages)).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))}
        </ul>
      ) : (
        <div className="w-full mt-24 text-center">There is no product</div>
      )}
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default InfiniteProducts
