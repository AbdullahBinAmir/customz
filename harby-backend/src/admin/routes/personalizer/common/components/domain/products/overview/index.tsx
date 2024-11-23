import { useAdminCreateBatchJob, useAdminCreateCollection } from "medusa-react"
import React, { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Fade from "../../../atoms/fade-wrapper"
import Button from "../../../fundamentals/button"
import ExportIcon from "../../../fundamentals/icons/export-icon"
import PlusIcon from "../../../fundamentals/icons/plus-icon"
import UploadIcon from "../../../fundamentals/icons/upload-icon"
import BodyCard from "../../../organisms/body-card"
import TableViewHeader from "../../../organisms/custom-table-header"
import ExportModal from "../../../organisms/export-modal"
import AddCollectionModal from "../../../templates/collection-modal"
import CollectionsTable from "../../../templates/collections-table"
import ProductTable from "../../../templates/product-table"
import useNotification from "../../../hooks/use-notification"
import useToggleState from "../../../hooks/use-toggle-state"
import { getErrorMessage } from "../../../utils/error-messages"
import ImportProducts from "../batch-job/import"
import NewProduct from "../new"
import NewPersonalizer from "../../personalizer/new"
import { PollingContext } from "../../../context/polling"

// const VIEWS = ["products", "collections", "personalizer"]
const VIEWS = ["products", "collections"]

const Overview = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [view, setView] = useState("products")
  const {
    state: createPersonalizerState,
    close: closePersonalizerCreate,
    open: openPersonalizerCreate,
  } = useToggleState()
  const {
    state: createProductState,
    close: closeProductCreate,
    open: openProductCreate,
  } = useToggleState()

  const { resetInterval } = useContext(PollingContext)
  const createBatchJob = useAdminCreateBatchJob()

  const notification = useNotification()

  const createCollection = useAdminCreateCollection()

  useEffect(() => {
    if (location.search.includes("?view=collections")) {
      setView("collections")
    }
  }, [location])

  // useEffect(() => {
  //   if (location.search.includes("?view=personalizer")) {
  //     setView("personalizer")
  //   }
  // }, [location])

  useEffect(() => {
    location.search = ""
  }, [view])

  const CurrentView = () => {
    switch (view) {
      case "products":
        return <ProductTable />
      case "collections":
        return <CollectionsTable />
      // default:
      //   return <PersonalizerTable />
    }
  }

  const CurrentAction = () => {
    switch (view) {
      case "products":
        return (
          <div className="flex space-x-2">
            {/* <Button
              variant="secondary"
              size="small"
              onClick={() => openImportModal()}
            >
              <UploadIcon size={20} />
              Import Products
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => openExportModal()}
            >
              <ExportIcon size={20} />
              Export Products
            </Button> */}
            <Button
              variant="secondary"
              size="small"
              onClick={openProductCreate}
            >
              <PlusIcon size={20} />
              New Product
            </Button>
          </div>
        )
      // case "personalizer":
      //   return (
      //     <div className="flex space-x-2">
      //       <Button
      //         variant="secondary"
      //         size="small"
      //         onClick={openPersonalizerCreate}
      //       >
      //         <PlusIcon size={20} />
      //         New Personalizer
      //       </Button>
      //     </div>
      //   )
      default:
        return (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setShowNewCollection(!showNewCollection)}
            >
              <PlusIcon size={20} />
              New Collection
            </Button>
          </div>
        )
    }
  }

  const [showNewCollection, setShowNewCollection] = useState(false)
  const {
    open: openExportModal,
    close: closeExportModal,
    state: exportModalOpen,
  } = useToggleState(false)

  const {
    open: openImportModal,
    close: closeImportModal,
    state: importModalOpen,
  } = useToggleState(false)

  const handleCreateCollection = async (data, colMetadata) => {
    const metadata = colMetadata
      .filter((m) => m.key && m.value) // remove empty metadata
      .reduce((acc, next) => {
        return {
          ...acc,
          [next.key]: next.value,
        }
      }, {})

    await createCollection.mutateAsync(
      { ...data, metadata },
      {
        onSuccess: ({ collection }) => {
          notification("Success", "Successfully created collection", "success")
          navigate(`/a/collections/${collection.id}`)
          setShowNewCollection(false)
        },
        onError: (err) => notification("Error", getErrorMessage(err), "error"),
      }
    )
  }

  const handleCreateExport = () => {
    const reqObj = {
      type: "product-export",
      context: {},
      dry_run: false,
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
      {showNewCollection && (
        <AddCollectionModal
          onClose={() => setShowNewCollection(!showNewCollection)}
          onSubmit={handleCreateCollection}
        />
      )}
      {exportModalOpen && (
        <ExportModal
          title="Export Products"
          handleClose={() => closeExportModal()}
          onSubmit={handleCreateExport}
          loading={createBatchJob.isLoading}
        />
      )}
      {importModalOpen && (
        <ImportProducts handleClose={() => closeImportModal()} />
      )}
      <Fade isVisible={createPersonalizerState} isFullScreen={true}>
        <NewPersonalizer onClose={closePersonalizerCreate} />
      </Fade>
      <Fade isVisible={createProductState} isFullScreen={true}>
        <NewProduct onClose={closeProductCreate} />
      </Fade>
    </>
  )
}

export default Overview
