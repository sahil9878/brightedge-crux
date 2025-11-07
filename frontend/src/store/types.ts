export type TCrUXMetricWebVitalsCore =
  | "interaction_to_next_paint"
  | "largest_contentful_paint"
  | "cumulative_layout_shift";

export type TCruxMetrics =
  | "experimental_time_to_first_byte"
  | "round_trip_time"
  | "first_contentful_paint"
  | "largest_contentful_paint_image_element_render_delay"
  | "largest_contentful_paint_image_resource_load_delay"
  | "largest_contentful_paint_image_time_to_first_byte"
  | "largest_contentful_paint_image_resource_load_duration";

export type TCrUXMetricData = Record<
  TCruxMetrics | TCrUXMetricWebVitalsCore,
  string
>;
export type TCrUXMetricDataMap = Record<string, TCrUXMetricData>;

export type TCrUXData = {
  data: TCrUXMetricDataMap;
  searchMetrics: (query: string) => void;
};
