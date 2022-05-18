import { useTable, useFilters, usePagination } from "react-table";
import Filters from "./Filters";
import Table from "./Table";

const FilteredTable = ({
  columns,
  data,
}: {
  columns: any;
  data: Record<string, string>[];
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        // @ts-ignore
        filters: [
          {
            id: "is_featured",
            value: "0",
          },
        ],
      },
    },
    useFilters,
    usePagination
  );
  // @ts-ignore
  const { setFilter } = tableInstance;

  return (
    <>
      <Filters setFilter={setFilter} />
      <Table tableInstance={tableInstance} />
    </>
  );
};

export default FilteredTable;
