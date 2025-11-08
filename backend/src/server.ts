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
    res.status(400).send();
    return;
  }
  const originsStr = origins as string;
  const originNames = originsStr.split(",");
  const originsPromises = originNames.map((origin) =>
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
          const formattedMetrics = Object.entries(data.record.metrics).reduce(
            (acc, [metric, details], index) => {
              return {
                ...acc,
                ...(details.percentiles &&
                  details.percentiles.p75 && {
                    [metric]: {
                      value: parseInt(details.percentiles.p75),
                      unit: metric === "cumulative_layout_shift" ? "" : "ms",
                    },
                  }),
              };
            },
            {}
          );
          return formattedMetrics;
        }
      )
  );
  const responses = await Promise.allSettled(originsPromises);
  const formattedResponse = responses.map((response, index) => {
    return {
      ...(response.status === "fulfilled"
        ? response.value
        : { isInvalid: true }),
      origin: originNames[index],
      id: index,
    };
  });
  res.json(formattedResponse);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
