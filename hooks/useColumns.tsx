import { useMemo } from "react";
import { Column } from "react-table";

const useColumns = () => {
  const columns = useMemo(
    () =>
      [
        {
          id: "id",
          Header: "ID",
          accessor: "id",
          disableFilters: true,
        },
        {
          id: "name",
          Header: "Name",
          accessor: "name",
        },
        {
          id: "short_description",
          Header: "Description",
          accessor: "short_description",
          disableFilters: true,
        },
        {
          id: "is_featured",
          Header: "Featured",
          accessor: "is_featured",
          Cell: ({ value }) => (value === "1" ? "Yes" : "No"),
        },
      ] as Column[],
    []
  );

  return columns;
};

export default useColumns;
