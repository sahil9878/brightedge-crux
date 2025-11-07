import { create } from "zustand";
import type { TCrUXData } from "./types";

const useCruxStore = create<TCrUXData>((set) => ({
  data: {},
  searchMetrics: async (query: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/metrics?origins=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Metrics data:", data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  },
}));

export default useCruxStore;
