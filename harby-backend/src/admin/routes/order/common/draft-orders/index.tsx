import { useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import PlusIcon from "../../../personalizer/common/components/fundamentals/icons/plus-icon"
import BodyCard from "../../../personalizer/common/components/organisms/body-card"
import TableViewHeader from "../../../personalizer/common/components/organisms/custom-table-header"
import DraftOrderTable from "../../../personalizer/common/components/templates/draft-order-table"
import NewOrderFormProvider from "../new/form"
import NewOrder from "../new/new-order"
import DraftOrderDetails from "./details"

const VIEWS = ["orders", "drafts"]

const DraftOrderIndex = () => {
  const navigate = useNavigate()

  const view = "drafts"
  const [showNewOrder, setShowNewOrder] = useState(false)

  const actions = useMemo(() => {
    return [
      {
        label: "Create draft order",
        onClick: () => setShowNewOrder(true),
        icon: <PlusIcon size={20} />,
      },
    ]
  }, [view])

  return (
    <div className="flex flex-col grow h-full">
      <div className="w-full flex flex-col grow">
        <BodyCard
          customHeader={
            <TableViewHeader
              views={VIEWS}
              setActiveView={(v) => {
                if (v === "orders") {
                  navigate(`/a/order`)
                }
              }}
              activeView={view}
            />
          }
          actionables={actions}
          className="h-fit"
        >
          <DraftOrderTable />
        </BodyCard>
      </div>
      {showNewOrder && (
        <NewOrderFormProvider>
          <NewOrder onDismiss={() => setShowNewOrder(false)} />
        </NewOrderFormProvider>
      )}
    </div>
  )
}

const DraftOrders = () => {
  return (
    <Routes>
      <Route index element={<DraftOrderIndex />} />
      <Route path="/:id" element={<DraftOrderDetails />} />
    </Routes>
  )
}

export default DraftOrders
