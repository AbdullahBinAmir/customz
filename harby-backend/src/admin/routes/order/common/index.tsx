import { useAdminCreateBatchJob, useAdminGetSession } from "medusa-react"
import React, { useContext, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import Button from "../../personalizer/common/components/fundamentals/button"
import ExportIcon from "../../personalizer/common/components/fundamentals/icons/export-icon"
import PickupIcon from "../../personalizer/common/components/fundamentals/icons/send-icon"
import BodyCard from "../../personalizer/common/components/organisms/body-card"
import TableViewHeader from "../../personalizer/common/components/organisms/custom-table-header"
import ExportModal from "../../personalizer/common/components/organisms/export-modal"
import OrderTable from "../../personalizer/common/components/templates/order-table"
import useNotification from "../../personalizer/common/components/hooks/use-notification"
import useToggleState from "../../personalizer/common/components/hooks/use-toggle-state"
import { getErrorMessage } from "../../personalizer/common/components/utils/error-messages"
import { PollingContext } from "../../personalizer/common/components/context/polling"
import Details from "./details"
import { transformFiltersAsExportContext } from "./utils"
import { createPickupRequest } from "../../personalizer/common/services/customApi"

const VIEWS = ["orders", "drafts"]

const OrderIndex = () => {
  const { user,isLoading } = useAdminGetSession()
  const view = "orders"

  const { resetInterval } = useContext(PollingContext)
  const navigate = useNavigate()
  const createBatchJob = useAdminCreateBatchJob()
  const notification = useNotification()

  const [contextFilters, setContextFilters] =
    useState<Record<string, { filter: string[] }>>()

  const {
    open: openExportModal,
    close: closeExportModal,
    state: exportModalOpen,
  } = useToggleState(false)

  const actions = useMemo(() => {
    return [
      <div className="flex gap-4">
        {/* <Button
          variant="secondary"
          size="small"
          onClick={() => openExportModal()}
        >
          <ExportIcon size={20} />
          Export Orders
        </Button> */}
        <Button
          variant="secondary"
          size="small"
          onClick={() => handleCreatePickupRequest()}
        >
          <PickupIcon size={20} />
          Pickup Request
        </Button>
      </div>,
    ]
  }, [view])

  const handleCreateExport = () => {
    const reqObj = {
      dry_run: false,
      type: "order-export",
      context: contextFilters
        ? transformFiltersAsExportContext(contextFilters)
        : {},
    }

    createBatchJob.mutate(reqObj, {
      onSuccess: () => {
        resetInterval()
        notification("Success", "Successfully initiated export", "success")
      },
      onError: (err) => {
        notification("Error", getErrorMessage(err), "error")
      },
    })

    closeExportModal()
  }

  const handleCreatePickupRequest = async () => {
    const res = await createPickupRequest()
    console.log("createPickupRequest...:", res)
    if (res?.status === 200) {
      notification("Succes", res.data.message, "success")
    } else {
      notification("Error", res?.data?.message, "error")
    }
  }

  
  if(isLoading){
    return(
      <span>Loading...</span>
    )
  }
  else{
  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            customHeader={
              user?.role === "admin" && (
                <TableViewHeader
                  views={VIEWS}
                  setActiveView={(v) => {
                    if (v === "drafts") {
                      navigate(`/a/draft-orders`)
                    }
                  }}
                  activeView={view}
                />
              )
            }
            className="h-fit"
            customActionable={user?.role === "admin" && actions}
          >
            <OrderTable setContextFilters={setContextFilters} />
          </BodyCard>
        </div>
      </div>
      {exportModalOpen && (
        <ExportModal
          title="Export Orders"
          handleClose={() => closeExportModal()}
          onSubmit={handleCreateExport}
          loading={createBatchJob.isLoading}
        />
      )}
    </>
  )
}
}
const Orders = () => {
  return (
    <Routes>
      <Route index element={<OrderIndex />} />
      <Route path="/:id" element={<Details />} />
    </Routes>
  )
}

export default Orders
