import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid4 } from "iconsax-reactjs";
import { getSidebarData } from "@/layout/sidebar/data";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const data = getSidebarData();

  const [isOpen, setIsOpen] = useState(true);

  // mobile default collapsed
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <aside
    //   className={cn(
    //     "bg-F2FCFF h-screen shadow-custom-1 transition-all duration-300 flex flex-col",
    //     isOpen ? "w-[260px]" : "w-20"
    //   )}
    // >
    <aside
      className={cn(
        "fixed top-24 left-4 z-40 h-screen bg-F2FCFF shadow-custom-1 transition-all duration-300 flex flex-col",
        isOpen ? "w-[260px]" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <Grid4
          width={24}
          height={24}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-CFE6F1 p-1 rounded-md cursor-pointer"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {data.map(({ title, icon, link }) => (
          <NavLink
            key={title}
            to={link}
            onClick={() => {
              // mobile: expand on item click
              if (window.innerWidth < 768) {
                setIsOpen(true);
              }
            }}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg border-l-4 transition-all",
                "hover:bg-CFE6F1 hover:text-007B99 hover:border-007B99",
                isActive
                  ? "bg-CFE6F1 text-007B99 border-007B99"
                  : "text-[#2B3133] border-transparent"
              )
            }
          >
            <span className="min-w-[24px] flex justify-center">{icon}</span>

            {/* Title */}
            {isOpen && (
              <span className="font-bold text-base 2xl:text-lg whitespace-nowrap">
                {title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
