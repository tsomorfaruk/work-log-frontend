// import { Outlet } from "react-router-dom";
// import Navbar from "./navbar/Navbar";
// import Sidebar from "./sidebar/Sidebar";

// export default function Layout() {
//   return (
//     <div className="p-10">
//       <div className="mb-10">
//         <Navbar />
//       </div>
//       <div className="flex h-[78vh] items-start gap-6">
//         <Sidebar />
//         <div className="flex-1">
//           <Outlet />
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useAppSelector } from "@/redux/hooks";

export default function Layout() {
  const isOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="bg-white">
      <div className="mb-10">
        <Navbar />
      </div>
      <Sidebar />

      <div
        className="transition-all duration-300"
        style={{ marginLeft: isOpen ? "260px" : "80px" }}
      >
        <div className="pl-7 p-4 lg:p-10">
          <div className="min-h-[calc(100vh-80px)] mt-10 lg:mt-4">
            {" "}
            {/* 80px ~ navbar height */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
