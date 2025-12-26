import { AnalyticIcon, BellIcon, CalendarIcon, UserIcon } from "@/icons";
import { Element3 } from "iconsax-reactjs";

export const sideItems = [
  {
    link: "/",
    title: "Dashboard",
    icon: <Element3 width={24} height={24} />,
  },
  {
    link: "schedule",
    title: "Scheduling",
    icon: <CalendarIcon width={24} height={24} />,
  },
  {
    link: "Requests",
    title: "Requests",
    icon: <BellIcon width={24} height={24} />,
  },
  {
    link: "request",
    title: "Employees",
    icon: <UserIcon width={24} height={24} />,
  },
  {
    link: "reporting",
    title: "Reporting",
    icon: <AnalyticIcon width={24} height={24} />,
  },
];
