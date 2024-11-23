import { StoreGetProductsParams } from "@medusajs/medusa"
import clsx from "clsx"
import { useCollections } from "medusa-react"
import { ChangeEvent, useEffect, useState } from "react"

type RefinementListProps = {
  refinementList: StoreGetProductsParams
  setRefinementList: (refinementList: StoreGetProductsParams) => void
  isPersonalizer: string | null
}

const RefinementList = ({
  refinementList,
  setRefinementList,
  isPersonalizer,
}: RefinementListProps) => {
  const { collections, isLoading } = useCollections()
  const [personalizerSet, setPersonalizerSet] = useState(false)

  const personalizer = collections?.find((c) => c.handle === "personalizer")

  useEffect(() => {
    // Set the personalizer category only once when isPersonalizer is true
    if (isPersonalizer && personalizer && !personalizerSet) {
      setRefinementList({
        ...refinementList,
        collection_id: [personalizer.id],
      })
      setPersonalizerSet(true)
    }
  }, [
    isPersonalizer,
    personalizer,
    refinementList,
    setRefinementList,
    personalizerSet,
  ])

  // Old handleCollectionChange code for multiple collection selection

  // const handleCollectionChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   id: string
  // ) => {
  //   const { checked } = e.target

  //   const collectionIds = refinementList.collection_id || []

  //   const exists = collectionIds.includes(id)

  //   // if (checked && !exists) {
  //   if (!exists) {
  //     setRefinementList({
  //       ...refinementList,
  //       collection_id: [...collectionIds, id],
  //     })

  //     return
  //   }

  //   // if (!checked && exists) {
  //   if (exists) {
  //     setRefinementList({
  //       ...refinementList,
  //       collection_id: collectionIds.filter((c) => c !== id),
  //     })

  //     return
  //   }

  //   return
  // }

  // new handleCollectionChange code for single collection selection

  const handleCollectionChange = (id: string) => {
    if (id === "all") {
      // Select all collections
      const allCollectionIds = collections?.map((c) => c.id)
      setRefinementList({
        ...refinementList,
        collection_id: allCollectionIds,
      })
    } else {
      // Single collection selection logic
      setRefinementList({
        ...refinementList,
        collection_id: [id],
      })
    }
  }

  return (
    <div>
      {/* <div className="px-8 py-4  small:pr-0 small:pl-8 small:min-w-[250px]">
        <div className="flex gap-x-3 small:flex-col small:gap-y-3">
          <span className="text-base-semi">Collections</span>
          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
            {collections?.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={refinementList.collection_id?.includes(
                      c.id
                    )}
                    onChange={(e) => handleCollectionChange(e, c.id)}
                    className="accent-amber-200"
                  />
                  {c.title}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {collections && collections.length ? (
        <div className="px-8 small:pr-0 small:pl-8 small:min-w-[250px] mb-4 small:mb-0">
          <div className="flex gap-x-3 small:flex-col small:gap-y-3 bg-[#fff] py-9 rounded-[20px]">
            <span className="hidden small:block text-[25px] text-[#000] font-semibold leading-7 px-8">
              Product Categories
            </span>
            {/* <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2 "> */}
            <ul className="text-base-regular items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-1 px-4">
              <li>
                <label
                  // for multiple selection
                  // onClick={(e: any) => handleCollectionChange(e, c.id)}
                  // for signle selection
                  onClick={() => handleCollectionChange("all")}
                  className={clsx(
                    "flex items-center gap-x-2 text-[#404042] text-[20px] font-normal leading-6 cursor-pointer w-full px-4 py-2 rounded-lg",
                    {
                      // Highlight the "All" label without affecting other labels
                      "bg-gray-50":
                        refinementList.collection_id?.length ===
                        collections?.length,
                    }
                  )}
                >
                  All
                </label>
              </li>
              {collections?.map((c) => (
                <li key={c.id}>
                  <label
                    // for multiple selection
                    // onClick={(e: any) => handleCollectionChange(e, c.id)}
                    // for signle selection
                    onClick={() => handleCollectionChange(c.id)}
                    className={clsx(
                      "flex items-center gap-x-2 text-[#404042] text-[20px] font-normal leading-6 cursor-pointer w-full px-4 py-2 rounded-lg",
                      {
                        // Only apply background color when an individual collection is selected, not when "All" is selected
                        "bg-gray-50":
                          refinementList.collection_id?.includes(c.id) &&
                          refinementList.collection_id?.length !==
                            collections?.length,
                      }
                    )}
                  >
                    {/* <input
                      type="checkbox"
                      defaultChecked={refinementList.collection_id?.includes(
                        c.id
                      )}
                      onChange={(e) => handleCollectionChange(e, c.id)}
                      className="w-4 h-4"
                    /> */}
                    {c.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RefinementList
