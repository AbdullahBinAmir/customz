import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Fade from "../../../atoms/fade-wrapper"
import Button from "../../../fundamentals/button"
import PlusIcon from "../../../fundamentals/icons/plus-icon"
import BodyCard from "../../../organisms/body-card"
import TableViewHeader from "../../../organisms/custom-table-header"
import useToggleState from "../../../hooks/use-toggle-state"
import InventoryTable from "../templates/inventory-table"
import NewInventory from "../new"

const VIEWS = ["inventory"]

const Overview = () => {
  const location = useLocation()
  const [view, setView] = useState("inventory")
  const {
    state: createProductState,
    close: closeProductCreate,
    open: openProductCreate,
  } = useToggleState()


  useEffect(() => {
    location.search = ""
  }, [view])

  const CurrentView = () => {
    switch (view) {
      case "inventory":
        return <InventoryTable />
    }
  }

  const CurrentAction = () => {
    switch (view) {
      case "inventory":
        return (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="small"
              onClick={openProductCreate}
            >
              <PlusIcon size={20} />
              New Inventory
            </Button>
          </div>
        )
    }
  }

  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            forceDropdown={false}
            customActionable={CurrentAction()}
            customHeader={
              <TableViewHeader
                views={VIEWS}
                setActiveView={setView}
                activeView={view}
              />
            }
            className="h-fit"
          >
            <CurrentView />
          </BodyCard>
        </div>
      </div>
      <Fade isVisible={createProductState} isFullScreen={true}>
        <NewInventory onClose={closeProductCreate} />
      </Fade>
    </>
  )
}

export default Overview
