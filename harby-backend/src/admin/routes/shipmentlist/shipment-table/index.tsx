import qs from "qs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import Table from "../../personalizer/common/components/molecules/table";
import TableContainer from "../../personalizer/common/components/organisms/table-container";
import useAdminPickupList from "./use-admin-pickup";
import { usePickupRequestColumns } from "./use-pickup-columns";

const DEFAULT_PAGE_SIZE = 15;

const PickupRequetsTable = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const queryObject = {
    query,
    page,
    pageSize,
  };

  const { list, isLoading, count } = useAdminPickupList(qs.stringify(queryObject));

  const [columns] = usePickupRequestColumns();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: list || [],
      manualPagination: true,
      initialState: {
        pageSize: pageSize,
        pageIndex: page - 1,
      },
      pageCount: Math.ceil(count / pageSize),
      autoResetPage: false,
    },
    usePagination
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleNext = () => {
    if (canNextPage) {
      nextPage();
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canPreviousPage) {
      previousPage();
      setPage((prev) => prev - 1);
    }
  };

  return (
    <TableContainer
      hasPagination
      numberOfRows={pageSize}
      pagingState={{
        count: count,
        offset: (page - 1) * pageSize,
        pageSize: pageSize,
        title: "Pickup Requests",
        currentPage: page,
        pageCount: pageCount,
        nextPage: handleNext,
        prevPage: handlePrev,
        hasNext: canNextPage,
        hasPrev: canPreviousPage,
      }}
      isLoading={isLoading}
    >
      <Table
        // enableSearch
        handleSearch={setQuery}
        searchValue={query}
        {...getTableProps()}
      >
        <Table.Head>
          {headerGroups?.map((headerGroup) => (
            <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Table.HeadCell className="w-[150px]" {...col.getHeaderProps()}>
                  {col.render("Header")}
                </Table.HeadCell>
              ))}
            </Table.HeadRow>
          ))}
        </Table.Head>
        <Table.Body {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Table.Row
                color={"inherit"}
                linkTo={row.original.id}
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <Table.Cell {...cell.getCellProps()}>
                      {cell.render("Cell", { index })}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  );
};

export default PickupRequetsTable;