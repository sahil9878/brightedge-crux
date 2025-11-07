import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useCruxStore from "../store";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const searchMetrics = useCruxStore((state) => state.searchMetrics);

  const searchOrigin = () => {
    searchMetrics(input);
  };
  return (
    <Stack direction={"row"} gap={5} alignItems={"start"}>
      <Typography>URL:</Typography>
      <TextField
        id="search-input"
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value);
        }}
        size="small"
        variant="outlined"
        label="Search for website origins"
        helperText="Please enter comma separated origins to search multiple origins"
        sx={{ flexGrow: 1 }}
      />
      <Button
        sx={{ height: "40px" }}
        variant="contained"
        onClick={searchOrigin}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchInput;
