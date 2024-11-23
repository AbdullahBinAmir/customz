import { useMemo } from "react";

export const useBulkOrderColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "status",
        accessor: "status",
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
      {
        Header: "Image",
        accessor: "img",
        Cell: ({ cell: { value } }) => (
          value ? <img src={value} alt="Bulk Order Image" style={{ width: '50px' }} /> : "No Image"
        ),
      },
    ],
    []
  );

  return [columns];
};