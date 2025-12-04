import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isAuth = Boolean(localStorage.getItem("token")); 
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
