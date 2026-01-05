import { AnalyticIcon, BellIcon, CalendarIcon, UserIcon } from "@/icons";
import { Element3 } from "iconsax-reactjs";

export const sideItems = [
  {
    link: "/",
    title: "Dashboard",
    icon: <Element3 width={24} height={24} />,
  },
  {
    link: "scheduling",
    title: "Scheduling",
    icon: <CalendarIcon width={24} height={24} />,
  },
  {
    link: "requests",
    title: "Requests",
    icon: <BellIcon width={24} height={24} />,
  },
  {
    link: "employees",
    title: "Employees",
    icon: <UserIcon width={24} height={24} />,
  },
  {
    link: "reporting",
    title: "Reporting",
    icon: <AnalyticIcon width={24} height={24} />,
  },
];
