import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const isAuth = Boolean(localStorage.getItem("token")); 
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
