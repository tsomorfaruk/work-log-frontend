import { getSidebarData } from "@/layout/sidebar/data";
import { Grid4 } from "iconsax-reactjs";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const data = getSidebarData();

  return (
    <div className="bg-F2FCFF h-10 py-3 w-[260px] shadow-custom-1 rounded-xl">
      <div className="mx-4">
        <Grid4
          width={24}
          height={24}
          className="bg-CFE6F1 p-1 rounded-md mb-4"
        />
      </div>
      {data.map(({ title, icon, link = "" }) => (
        <NavLink
          to={link}
          key={title}
          className={({ isActive }) => `list-none
             flex cursor-pointer border-l-4 items-center gap-3 px-4 py-3 font-bold text-base 2xl:text-xl  hover:text-007B99  hover:bg-CFE6F1 ${
               isActive
                 ? "bg-CFE6F text-007B99 border-007B99"
                 : "text-[#2B3133] bg-transparent border-transparent"
             }`}
        >
          <li className="">{icon}</li>
          <li>{title}</li>
        </NavLink>
      ))}
    </div>
  );
}
