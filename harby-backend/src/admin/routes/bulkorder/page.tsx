import { RouteConfig } from "@medusajs/admin"
import BulkOrder from "../../icons/bulkorder"
import BodyCard from "../personalizer/common/components/organisms/body-card"
import BulkOrderTable from "./bulkorder-table"
import { Route, Routes } from "react-router-dom"
import EditForm from "./edit"
import TableViewHeader from "../personalizer/common/components/organisms/custom-table-header"

const Overview = () => {
  return (
    <div className="gap-y-xsmall flex flex-col">
      <BodyCard
        forceDropdown={false}
        customHeader={
          <TableViewHeader
            views={["Bulk Orders"]}
          />
        }
        className="h-fit"
      >
        <BulkOrderTable />
      </BodyCard>
    </div>
  )
}

const BulkOrderPage = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="/:id" element={<EditForm />} />
    </Routes>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Bulk Orders",
    icon: BulkOrder
  }
}

export default BulkOrderPage