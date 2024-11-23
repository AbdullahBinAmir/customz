import { isEmpty } from "lodash";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import ProductOverview from "./overview";
import useProductActions from "./use-inventory-actions";
import useProductTableColumn from "./use-inventory-column";
import useNotification from "../../../../hooks/use-notification";
import { medusaUrl } from "../../../../../services/config";
import TableContainer from "../../../../organisms/table-container";
import Table from "../../../../molecules/table";

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_PAGE_SIZE_TILE_VIEW = 18;

const InventoryTable = () => {
  const notification = useNotification();

  const [query, setQuery] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify({
        offset,
        limit,
        query,
      });

      const response = await fetch(`${medusaUrl}/store/custom/getcustominventory?${queryString}`);
      const data = await response.json();
      setProducts(data.inventories);
      setCount(data.count);
      setNumPages(Math.ceil(data.count / limit));
    } catch (error) {
      notification("Error", "Failed to fetch products.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, offset, limit]);

  const setTileView = () => {
    setLimit(DEFAULT_PAGE_SIZE_TILE_VIEW);
    setShowList(false);
  };

  const setListView = () => {
    setLimit(DEFAULT_PAGE_SIZE);
    setShowList(true);
  };

  const [columns] = useProductTableColumn({showList});

  console.log(products)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: products || [],
      manualPagination: true,
      initialState: {
        pageIndex: Math.floor(offset / limit),
        pageSize: limit,
      },
      pageCount: numPages,
      autoResetPage: false,
    },
    usePagination
  );

  const handleNext = () => {
    if (canNextPage) {
      setOffset((prev) => prev + limit);
      nextPage();
    }
  };

  const handlePrev = () => {
    if (canPreviousPage) {
      setOffset((prev) => prev - limit);
      previousPage();
    }
  };

  return (
    <TableContainer
      numberOfRows={limit}
      hasPagination
      pagingState={{
        count: count,
        offset: offset,
        pageSize: limit,
        title: "Custom Inventory",
        currentPage: pageIndex + 1,
        pageCount: pageCount,
        nextPage: handleNext,
        prevPage: handlePrev,
        hasNext: canNextPage,
        hasPrev: canPreviousPage,
      }}
      isLoading={isLoading}
    >
      <Table
        filteringOptions={<></>}
        enableSearch
        searchValue={query}
        handleSearch={(value) => {
          setQuery(value);
          setOffset(0); // Reset offset when new search is initiated
        }}
        {...getTableProps()}
      >
        {showList ? (
          <>
            <Table.Head>
              {headerGroups.map((headerGroup) => (
                <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <Table.HeadCell
                      className="min-w-[100px]"
                      {...col.getHeaderProps()}
                    >
                      {col.render("Header")}
                    </Table.HeadCell>
                  ))}
                </Table.HeadRow>
              ))}
            </Table.Head>

            <Table.Body {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return <ProductRow row={row} {...row.getRowProps()} />;
              })}
            </Table.Body>
          </>
        ) : (
          <ProductOverview products={products} toggleListView={setListView} />
        )}
      </Table>
    </TableContainer>
  );
};

const ProductRow = ({ row, ...rest }) => {
  console.log(row)
  const product = row.original;
  const { getActions } = useProductActions(product);

  return (
    <Table.Row
      color={"inherit"}
      linkTo={`/a/custominventory/${product.id}`}
      actions={getActions()}
      {...rest}
    >
      {row.cells.map((cell, index) => (
        <Table.Cell {...cell.getCellProps()}>
          {cell.render("Cell", { index })}
        </Table.Cell>
      ))}
    </Table.Row>
  );
};

export default InventoryTable;
