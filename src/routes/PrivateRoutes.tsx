import { getAuthToken } from "@/lib/authCookie";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const token = getAuthToken();

  // Here we have token but also it is needed to verify its validity with backend like expired or not

  return !token ? <Navigate to="/login" replace /> : <Outlet />;
}
