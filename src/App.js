import { Box } from "@mui/material";
import { CategoryTabs } from "./components/CategoryTabs";
import { Navbar } from "./components/Navbar";
import { NotesProvider } from "./components/NotesContext";


function App() {

  return (
    <NotesProvider>
        <Navbar />
        <CategoryTabs />
    </NotesProvider>
  )
}

export default App;
