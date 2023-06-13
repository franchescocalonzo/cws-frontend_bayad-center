import { Outlet, Navigate } from "react-router-dom";

import { isAuthenticated } from "../api/auth";
const ProtectedRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
