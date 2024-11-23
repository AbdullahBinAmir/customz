import { Fragment } from "react"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"

const ProductInfoTab = () => {
  return (
    <>
      <TabGroup className="mt-6">
        <TabList className="flex gap-4">
          {/* <Tab className="text-[#6F6F6F] data-[selected]:text-black data-[selected]:outline-none data-[selected]:border-b-blue-dark border-b-transparent border-b-2 pb-2 text-2xl leading-6 font-medium">
            Description
          </Tab> */}
          {/* <Tab className="text-[#6F6F6F] data-[selected]:text-black data-[selected]:outline-none data-[selected]:border-b-blue-dark border-b-transparent border-b-2 pb-2 text-2xl leading-6 font-medium">
            Information
          </Tab> */}
        </TabList>
        {/* <TabPanels className="mt-4">
          <TabPanel>Description will go here</TabPanel>
          <TabPanel>Info will go here</TabPanel>
        </TabPanels> */}
      </TabGroup>

      {/* <TabGroup className="mt-10">
        <TabList className="flex gap-4">
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  "text-[#6F6F6F] px-8 py-2 border rounded-full",
                  // hover && "bg-[#b3e8ef] shadow",
                  selected &&
                    "bg-blue-dark text-black outline-none border-blue-dark"
                )}
              >
                Description
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  "text-[#6F6F6F] px-8 py-2 border rounded-full",
                  // hover && "bg-[#b3e8ef] shadow",
                  selected &&
                    "bg-blue-dark text-black outline-none border-blue-dark"
                )}
              >
                Additional Information
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels className="mt-4">
          <TabPanel>Description will go here</TabPanel>
          <TabPanel>Info will go here</TabPanel>
        </TabPanels>
      </TabGroup> */}
    </>
  )
}

export default ProductInfoTab
