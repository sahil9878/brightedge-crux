import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type {
  TCrUXMetricData,
  TCrUXMetrics,
  TCrUXMetricValue,
} from "../../store/types";

const cruxMetricValueGetter = (value: TCrUXMetricValue) =>
  value ? value.value : null;
const cruxMetricRenderCell = (
  params: GridRenderCellParams<TCrUXMetricData>
) => {
  const val = params.row[params.field as TCrUXMetrics];
  return !val
    ? "No data found."
    : `${val.value}${val.unit ? ` ${val.unit}` : ""}`;
};

export const columns: GridColDef<TCrUXMetricData>[] = [
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
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "interaction_to_next_paint",
    headerName: "INP - Interaction to Next Paint",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "first_contentful_paint",
    headerName: "FCP - First Contentful Paint",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "round_trip_time",
    headerName: "Round trip time",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "experimental_time_to_first_byte",
    headerName: "TTFB - Time to first byte (Experimental)",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_time_to_first_byte",
    headerName: "Largest Contentful Paint Image Time to First Byte",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_resource_load_delay",
    headerName: "Largest Contentful Paint Image Resource Load Delay",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_resource_load_duration",
    headerName: "Largest Contentful Paint Image Resource load duration",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
  {
    field: "largest_contentful_paint_image_element_render_delay",
    headerName: "Largest Contentful Paint Image Element render delay",
    valueGetter: cruxMetricValueGetter,
    renderCell: cruxMetricRenderCell,
    align: "right",
    minWidth: 150,
  },
];

export function addSumAndAverageRows(data: TCrUXMetricData[]) {
  if (!Array.isArray(data) || data.length === 0) return data;

  // Get all unique metric keys (excluding id and origin)
  const validRows = data.filter((row) => !row.isInvalid);
  if (validRows.length === 0) return data;
  const metricKeys = Object.keys(validRows[0]).filter(
    (key) => key !== "id" && key !== "origin"
  ) as TCrUXMetrics[];

  // Initialize sum accumulator
  const sumObj = {} as TCrUXMetricData;
  metricKeys.forEach((key) => {
    sumObj[key] = {
      value: 0,
      unit: data[0][key]?.unit || "",
    };
  });

  // Accumulate sums
  data.forEach((item) => {
    metricKeys.forEach((key) => {
      const val = item[key]?.value ?? 0;
      if (!isNaN(val)) {
        sumObj[key].value += val;
      }
    });
  });

  const count = validRows.length;

  // Compute average
  const avgObj = {} as TCrUXMetricData;
  metricKeys.forEach((key) => {
    avgObj[key] = {
      value: Number((sumObj[key].value / count).toFixed(2)),
      unit: sumObj[key].unit,
    };
  });

  // Add origin/id fields
  sumObj.origin = "Sum (All URLs)";
  sumObj.id = data.length;
  sumObj.isSummaryRow = true;
  avgObj.origin = "Average (All URLs)";
  avgObj.id = data.length + 1;
  avgObj.isSummaryRow = true;

  // Return new array with sum and average appended
  return [...data, sumObj, avgObj];
}
