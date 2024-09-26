// src/App.jsx
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import AppRoutes from "./routes/Routes";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  document.title = "Finances ";

  return (
    <div className={styles.App}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
