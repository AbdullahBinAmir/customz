import { Product } from "@medusajs/medusa"
// import TrashIcon from "../../fundamentals/icons/trash-icon"
// import { getErrorMessage } from "../../../utils/error-messages"
// import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import { useNavigate } from "react-router-dom"
import { ActionType } from "../../../../molecules/actionables"
import EditIcon from "../../../../fundamentals/icons/edit-icon"
// import useNotification from "../../../hooks/use-notification"
// import { useState } from "react"
// import { MEDUSA_BACKEND_URL } from "src/admin/constants/medusa-backend-url"

const useProductActions = (product: Product) => {
  const navigate = useNavigate()
  // const notification = useNotification()
  // const dialog = useImperativeDialog()

  // const [isDeleting, setIsDeleting] = useState(false);

  // const onDelete = async () => {
  //   setIsDeleting(true);
  //   try {
  //     const response = await fetch(`${MEDUSA_BACKEND_URL}/store/custom/auctionProduct/${product.id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete the product.");
  //     }

  //     notification("Success", "Product deleted successfully.", "success");
  //     navigate("/a/auction-product"); // Navigate back to the product list after deletion
  //   } catch (error: any) {
  //     notification("Error", error.message, "error");
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  // const handleDelete = async () => {
  //   const shouldDelete = await dialog({
  //     heading: "Delete Product",
  //     text: "Are you sure you want to delete this product?",
  //   })

  //   if (shouldDelete) {
  //     onDelete()
  //   }
  // }



  const getActions = (): ActionType[] => [
    {
      label: "Edit",
      onClick: () => navigate(`/a/custominventory/${product.id}`),
      icon: <EditIcon size={20} />,
    },
    // {
    //   label: "Delete",
    //   variant: "danger",
    //   onClick: handleDelete,
    //   icon: <TrashIcon size={20} />,
    // },
  ]

  return {
    getActions,
  }
}

export default useProductActions
