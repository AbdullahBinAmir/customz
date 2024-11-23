import { useMemo } from "react"

const useProductTableColumn = ({ showList }) => {

  const columns = useMemo(
    () => [
      {
        Header: "Color",
        accessor: "color", // accessor is the "key" in the data
        Cell: ({ row: { original } }) => {
          return <div>{original?.color}</div>
        },
      },
      {
        Header: "Quantity",
        accessor: "qty",
        Cell: ({ row: { original } }) => {
          return <div>{original?.qty}</div>
        },
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ row: { original } }) => {
          return <div>{original?.type}</div>
        },
      },
      {
        Header: "Size",
        accessor: "size",
        Cell: ({ row: { original } }) => {
          return <div>{original?.size}</div>
        },
      },
    ],
    [showList]
  )

  return [columns] as const
}

export default useProductTableColumn
