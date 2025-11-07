import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.get("/metrics", async (req, res) => {
  const { origins } = req.query;
  if (!origins) {
    res.status(400);
    return;
  }
  console.log("origins", origins);
  const originsStr = origins as string;
  const originsPromises = originsStr.split(",").map((origin) =>
    fetch(`${process.env.CRUX_API_URL}?key=${process.env.GCP_API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origin: origin.trim() }),
    })
      .then((response) => response.json())
      .then(
        (data: {
          record: { metrics: Record<string, { percentiles: { p75: string } }> };
        }) => {
          console.log("data.record.metrics", data.record.metrics);
          const formattedMetrics = Object.entries(data.record.metrics)
            .map(([metric, details], index) => {
              if (details.percentiles && details.percentiles.p75) {
                return {
                  metric,
                  detauls: details.percentiles.p75,
                  unit: metric === "cumulative_layout_shift" ? "" : "ms",
                };
              }
              return null;
            })
            .filter((data) => data);
          return { origin: origin.trim(), metrics: formattedMetrics };
        }
      )
  );
  const responses = await Promise.allSettled(originsPromises);
  res.json({ origins: responses });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
