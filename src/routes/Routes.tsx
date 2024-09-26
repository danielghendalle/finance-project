// src/Routes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import LoginRegistration from "../pages/loginRegistration";
import Dashboard from "../pages/dashboard";
import User from "../pages/users";
import NewUser from "../pages/newUser";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loginRegistration" element={<LoginRegistration />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/newUsers" element={<NewUser />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
