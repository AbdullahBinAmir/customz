"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import Link from "next/link"

const StoreTemplate = () => {
  const searchParams = useSearchParams()
  const isPersonalizer = searchParams.get("personalizer")

  const [params, setParams] = useState<StoreGetProductsParams>({})

  return (
    <>
      <div className="flex justify-center items-center h-36 bg-[url('/shop/1.png')]">
        <p className="self-center">
          <Link href="/"> Home page </Link> &gt; Shop
        </p>
      </div>
      <div className="flex flex-col small:flex-row small:items-start py-6">
        <RefinementList
          refinementList={params}
          setRefinementList={setParams}
          isPersonalizer={isPersonalizer}
        />
        <InfiniteProducts params={params} />
      </div>
    </>
  )
}

export default StoreTemplate
