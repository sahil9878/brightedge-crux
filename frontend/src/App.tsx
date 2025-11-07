import { Container } from "@mui/material";
import "./App.css";
import SearchInput from "./components/SearchInput";
import CruxTable from "./components/CruxTable";

function App() {
  return (
    <Container>
      <header>
        <h2>CrUX App</h2>
      </header>
      <main>
        <SearchInput />
        <CruxTable />
      </main>
    </Container>
  );
}

export default App;
