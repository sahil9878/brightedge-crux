import useCruxStore from "../store";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { TCrUXMetricValue } from "../store/types";

const cruxMetricValueGetter = (value: TCrUXMetricValue) =>
  `${value.value}${value.unit ? ` ${value.unit}` : ""}`;

const CruxTable = () => {
  const data = useCruxStore((state) => state.data);
  console.log("data", data);
  const columns: GridColDef<(typeof data)[number]>[] = [
    { field: "origin", headerName: "Url", width: 200 },
    {
      field: "largest_contentful_paint",
      headerName: "LCP - Largest Contentful Paint",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "cumulative_layout_shift",
      headerName: "CLS - Cumulative layout Shift",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "interaction_to_next_paint",
      headerName: "INP - Interaction to Next Paint",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "first_contentful_paint",
      headerName: "FCP - First Contentful Paint",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "round_trip_time",
      headerName: "Round trip time",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "experimental_time_to_first_byte",
      headerName: "TTFB - Time to first byte (Experimental)",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "largest_contentful_paint_image_time_to_first_byte",
      headerName: "Largest Contentful Paint Image Time to First Byte",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "largest_contentful_paint_image_resource_load_delay",
      headerName: "Largest Contentful Paint Image Resource Load Delay",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "largest_contentful_paint_image_resource_load_duration",
      headerName: "Largest Contentful Paint Image Resource load duration",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
    {
      field: "largest_contentful_paint_image_element_render_delay",
      headerName: "Largest Contentful Paint Image Element render delay",
      valueGetter: cruxMetricValueGetter,
      width: 150,
    },
  ];

  return (
    <>
      <DataGrid rows={data} columns={columns} />
    </>
  );
};

export default CruxTable;
