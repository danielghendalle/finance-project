import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/index";
import Login from "./pages/login";
import LoginRegistration from "./pages/loginRegistration/index";
import ProtectedRoutes from "./services/ProtectedRoutes";
//@ts-ignore
import styles from "./App.module.scss";
import NewUser from "./pages/newUser";
import User from "./pages/users/index";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.App}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loginRegistration" element={<LoginRegistration />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/newUsers" element={<NewUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
