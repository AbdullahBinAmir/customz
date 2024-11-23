import { RouteConfig } from "@medusajs/admin"
import BulkOrder from "../../icons/bulkorder"
import BodyCard from "../personalizer/common/components/organisms/body-card"
import { Route, Routes } from "react-router-dom"
import EditForm from "./edit"
import TableViewHeader from "../personalizer/common/components/organisms/custom-table-header"
import NewsletterTable from "./newsletter-table"

const Overview = () => {
  return (
    <div className="gap-y-xsmall flex flex-col">
      <BodyCard
        forceDropdown={false}
        customHeader={
          <TableViewHeader
            views={["Newsletter"]}
          />
        }
        className="h-fit"
      >
        <NewsletterTable />
      </BodyCard>
    </div>
  )
}

const NewsletterPage = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="/:id" element={<EditForm />} />
    </Routes>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Newsleter",
    icon: BulkOrder
  }
}

export default NewsletterPage