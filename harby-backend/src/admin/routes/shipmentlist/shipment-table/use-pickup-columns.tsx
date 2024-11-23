import { useMemo } from "react";

export const usePickupRequestColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Request Id",
        accessor: "_id",
      },
      {
        Header: "Status",
        accessor: "state",
      },
      {
        Header: "Type",
        accessor: "type",
      }
    ],
    []
  );

  return [columns];
};