import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const {
    auth: { token: t },
  } = useContext(AuthContext);
  const token = true;

  return !token ? <Navigate to="/login" replace /> : <Outlet />;
}
