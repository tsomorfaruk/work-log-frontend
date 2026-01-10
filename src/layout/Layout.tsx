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

export default function Layout() {
  return (
    <div className="bg-white">
      <div className="mb-10">
        <Navbar />
      </div>
      <Sidebar />

      <div
        className="transition-all duration-300"
        style={{ marginLeft: window.innerWidth < 768 ? "0px" : "260px" }} // initial margin
      >
        <div className="p-10">
          <div className="min-h-[calc(100vh-80px)]">
            {" "}
            {/* 80px ~ navbar height */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
