import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="p-10">
      <div className="mb-10">
        <Navbar />
      </div>
      <div className="flex h-[78vh] items-start gap-6">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
