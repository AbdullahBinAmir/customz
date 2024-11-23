import { RouteConfig } from "@medusajs/admin"
import BodyCard from "../personalizer/common/components/organisms/body-card"
import { Route, Routes } from "react-router-dom"
import PickupRequests from "../../icons/pickup"
import PickupRequetsTable from "./shipment-table"
import TableViewHeader from "../personalizer/common/components/organisms/custom-table-header"

const Overview = () => {
  return (
    <div className="gap-y-xsmall flex flex-col">
      <BodyCard className="h-fit" forceDropdown={false}
        customHeader={
          <TableViewHeader
            views={["Pickup Requests"]}
          />
        }>
        <PickupRequetsTable />
      </BodyCard>
    </div>
  )
}

const PickupRequestPage = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
    </Routes>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Pickup Requests",
    icon: PickupRequests
  }
}

export default PickupRequestPage