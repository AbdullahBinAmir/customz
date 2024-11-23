import { useMemo } from "react";

export const useNewsletterColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
      }
    ],
    []
  );

  return [columns];
};