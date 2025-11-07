import useCruxStore from "../store";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type {
  TCrUXMetricData,
  TCrUXMetrics,
  TCrUXMetricValue,
} from "../store/types";
import { useMemo } from "react";
import { addSumAndAverageRows } from "../utils";

const cruxMetricValueGetter = (value: TCrUXMetricValue) => value.value;
const cruxMetricRenderCell = (
  params: GridRenderCellParams<TCrUXMetricData>
) => {
  const val = params.row[params.field as TCrUXMetrics];
  return `${val.value}${val.unit ? ` ${val.unit}` : ""}`;
};

const columns: GridColDef<TCrUXMetricData>[] = [
  { field: "origin", headerName: "Url", minWidth: 200 },
  {
    field: "largest_contentful_paint",
    headerName: "LCP - Largest Contentful Paint",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    minWidth: 150,
    type: "number",
  },
  {
    field: "cumulative_layout_shift",
    headerName: "CLS - Cumulative layout Shift",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "interaction_to_next_paint",
    headerName: "INP - Interaction to Next Paint",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "first_contentful_paint",
    headerName: "FCP - First Contentful Paint",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "round_trip_time",
    headerName: "Round trip time",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "experimental_time_to_first_byte",
    headerName: "TTFB - Time to first byte (Experimental)",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_time_to_first_byte",
    headerName: "Largest Contentful Paint Image Time to First Byte",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_resource_load_delay",
    headerName: "Largest Contentful Paint Image Resource Load Delay",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_resource_load_duration",
    headerName: "Largest Contentful Paint Image Resource load duration",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_element_render_delay",
    headerName: "Largest Contentful Paint Image Element render delay",
    valueGetter: cruxMetricValueGetter,
    minWidth: 150,
  },
];

const CruxTable = () => {
  const data = useCruxStore((state) => state.data);

  const modifiedRows: TCrUXMetricData[] = useMemo(() => {
    return addSumAndAverageRows(data);
  }, [data]);
  if (data.length === 0) return null;

  return (
    <>
      <DataGrid rows={modifiedRows} columns={columns} />
    </>
  );
};

export default CruxTable;
