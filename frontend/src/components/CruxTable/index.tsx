import useCruxStore from "../../store";
import { DataGrid } from "@mui/x-data-grid";
import type { TCrUXMetricData } from "../../store/types";
import { useMemo } from "react";
import { columns, addSumAndAverageRows } from "./utils";

const CruxTable = () => {
  const data = useCruxStore((state) => state.data);

  const modifiedRows: TCrUXMetricData[] = useMemo(() => {
    return addSumAndAverageRows(data);
  }, [data]);
  if (data.length === 0) return null;

  return (
    <>
      <DataGrid
        rows={modifiedRows}
        columns={columns}
        getRowClassName={(params) =>
          params.row.isSummaryRow
            ? "summary-row"
            : params.row.isInvalid
            ? "invalid-row"
            : ""
        }
        hideFooter={true}
      />
    </>
  );
};

export default CruxTable;
