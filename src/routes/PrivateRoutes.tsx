import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectAccessToken } from "@/services/auth/authSlice";

export default function PrivateRoutes() {
  const token = useAppSelector(selectAccessToken);

  // Here we have token but also it is needed to verify its validity with backend like expired or not

  return !token ? <Navigate to="/login" replace /> : <Outlet />;
}
