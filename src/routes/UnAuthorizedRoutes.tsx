import { Navigate, Outlet } from "react-router-dom";

import BgUrl from "@/assets/images/loginBg.jpg";
import { useAppSelector } from "@/redux/hooks";
import { selectAccessToken } from "@/services/auth/authSlice";

export default function UnAuthorizedRoutes() {
  const token = useAppSelector(selectAccessToken);

  if (token) {
    return <Navigate to="/scheduling" replace />;
  }

  // token is null → render login UI
  return (
    <div
      style={{ backgroundImage: `url(${BgUrl})` }}
      className="min-h-screen bg bg-cover bg-center bg-no-repeat place-content-center"
    >
      <div className="w-10/12 lg:w-4/12 mx-auto bg-[#CFE6F1] rounded-3xl">
        <Outlet />
      </div>
    </div>
  );
}
