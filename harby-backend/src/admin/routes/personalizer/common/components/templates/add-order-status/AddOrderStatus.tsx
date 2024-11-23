import { useEffect, useState } from "react"
import { medusaUrl } from "../../../services/config"

const AddOrderStatus = ({ order_id, status }) => {
  let [newValue, setNewVal] = useState("")
  useEffect(() => {
    fetch(
      `${medusaUrl}/store/custom/getOrdersWithCart?order_id=${order_id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }
        return response.json()
      })
      .then((result) => {
        console.log("Response:", result)
        setNewVal(
          result.context.customStatus
            ? result.context.customStatus.toLowerCase().replace(/_/g, " ")
            : status
        )
      })
      .catch((error) => console.error("Error:", error))
  }, [])
  return <div className="text-right text-grey-40">{newValue}</div>
}

export default AddOrderStatus
