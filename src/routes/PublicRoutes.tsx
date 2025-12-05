import { Outlet } from "react-router-dom";
import BgUrl from "@/assets/images/loginBg.jpg";

export default function PubRoutes() {
  return (
    <div
      style={{ backgroundImage: `url(${BgUrl})` }}
      className="min-h-screen bg bg-cover bg-center bg-no-repeat place-content-center"
    >
      <Outlet />
    </div>
  );
}
