import Layout from "@/layout/Layout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import PrivateRoutes from "./PrivateRoutes";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { CookieManager } from "@/classes/CookieManger";
import PublicRoutes from "./PublicRoutes";
import ForgotPassword from "@/pages/ForgotPassword";
import PasswordReset from "@/pages/PasswordRest";
import Scheduling from "@/pages/Scheduling";
import Requests from "@/pages/Requests";
import Employees from "@/pages/Employees";
import Reporting from "@/pages/Reporting";

export default function RootElement() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const token = CookieManager.get("token");
    if (token) {
      setAuth((prev) => ({ ...prev, token: token }));
    }
  }, [setAuth]);

  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="password-rest" element={<PasswordReset />} />

        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Route>

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scheduling" element={<Scheduling />} />
          <Route path="requests" element={<Requests />} />
          <Route path="employees" element={<Employees />} />
          <Route path="reporting" element={<Reporting />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
