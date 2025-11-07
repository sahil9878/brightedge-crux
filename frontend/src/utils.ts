import type { TCrUXMetricData, TCrUXMetrics } from "./store/types";

export function addSumAndAverageRows(data: TCrUXMetricData[]) {
  if (!Array.isArray(data) || data.length === 0) return data;

  // Get all unique metric keys (excluding id and origin)
  const metricKeys = Object.keys(data[0]).filter(
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

  const count = data.length;

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
  avgObj.origin = "Average (All URLs)";
  avgObj.id = data.length + 1;

  // Return new array with sum and average appended
  return [...data, sumObj, avgObj];
}
