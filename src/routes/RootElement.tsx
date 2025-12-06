import Layout from "@/layout/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export default function RootElement() {
  return (
    <Routes>
      {/* Public Layout (optional) */}
      <Route element={<PublicRoutes />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Route>

      {/* Private Routes */}
      <Route path="*" element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
