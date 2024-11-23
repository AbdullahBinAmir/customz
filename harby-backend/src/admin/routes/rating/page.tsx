import { RouteConfig } from "@medusajs/admin"
import Product from "../../icons/product"

import React, { useState, useMemo } from "react"
import { useTable, usePagination } from "react-table"
import { 
  Button, 
  Input, 
} from "@medusajs/ui"
import TableContainer from "../personalizer/common/components/organisms/table-container"
import Table from "../personalizer/common/components/molecules/table"
import { useAdminRatings } from "./hooks/use-admin-ratings"

const RatingPage = () => {
  const [query, setQuery] = useState("")
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  const { 
    ratings, 
    count, 
    isLoading, 
    error 
  } = useAdminRatings({
    offset,
    limit,
  })

  const columns = useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "productid",
      },
      {
        Header: "User ID",
        accessor: "user_id",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Review",
        accessor: "review",
      },
    //   {
    //     Header: "Actions",
    //     Cell: ({ row }) => (
    //       <>
    //         <Button onClick={() => {
    //           setSelectedRating(row.original)
    //           setIsUpdateModalOpen(true)
    //         }}>
    //           Edit
    //         </Button>
    //         <Button onClick={() => {
    //           setSelectedRating(row.original)
    //           handleDelete(row.original.id)
    //         }}>
    //           Delete
    //         </Button>
    //       </>
    //     ),
    //   },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: ratings,
      manualPagination: true,
      pageCount: Math.ceil(count / limit),
      initialState: { pageIndex: 0, pageSize: limit },
    },
    usePagination
  )

  const handleNext = () => {
    if (offset + limit < count) {
      setOffset(offset + limit)
      gotoPage(pageIndex + 1)
    }
  }

  const handlePrev = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit)
      gotoPage(pageIndex - 1)
    }
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <TableContainer
        numberOfRows={limit}
        hasPagination
        pagingState={{
          count: count,
          offset: offset,
          pageSize: limit,
          title: "Ratings",
          currentPage: pageIndex + 1,
          pageCount: pageCount,
          nextPage: handleNext,
          prevPage: handlePrev,
          hasNext: offset + limit < count,
          hasPrev: offset > 0,
        }}
        isLoading={isLoading}
      >
        <Table
          filteringOptions={<></>}
        //   enableSearch
          searchValue={query}
          handleSearch={(value) => {
            setQuery(value)
            setOffset(0)
          }}
          {...getTableProps()}
        >
          <Table.Head>
            {headerGroups.map((headerGroup) => (
              <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Table.HeadCell
                    className="min-w-[100px]"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Table.HeadCell>
                ))}
              </Table.HeadRow>
            ))}
          </Table.Head>

          <Table.Body {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Table.Row {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Table.Cell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </TableContainer>
    </div>
  )
}

export const config: RouteConfig = {
    link: {
        label: "Rating",
        icon: Product
    }
}

export default RatingPage