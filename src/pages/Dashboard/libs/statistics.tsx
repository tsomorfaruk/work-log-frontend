import { CalendarTickIcon } from "@/assets/icons/CalendarTickIcon";
import { MoonStrokedIcon } from "@/assets/icons/MoonStrokedIcon";
import { MoonFillIcon } from "@/assets/icons/MoonFillIcon";
import { PeopleIcon } from "@/assets/icons/PeopleIcon";
import { TimerRemoveIcon } from "@/assets/icons/TimerRemoveIcon";
import { UserRemoveIcon } from "@/assets/icons/UserRemoveIcon";
import { ReactNode } from "react";

const StatisticsCard = ({
  icon,
  title,
  value,
}: {
  value: number;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <div className="card-wrapper">
      <div className="flex justify-between mb-5">
        <h4 className="card-title mb-5">{value}</h4>
        {icon}
      </div>
      <p>{title}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <div className="w-full lg:w-[71%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6 justify-between items-center">
        <StatisticsCard
          title="Total Employees"
          value={452}
          icon={<PeopleIcon />}
        />
        <StatisticsCard
          title="Late Arrival"
          value={36}
          icon={<TimerRemoveIcon />}
        />
        <StatisticsCard
          title="Early Departures"
          value={6}
          icon={<MoonStrokedIcon />}
        />
        <StatisticsCard title="Absent" value={2} icon={<UserRemoveIcon />} />
        <StatisticsCard title="On Leave" value={5} icon={<MoonFillIcon />} />
        <StatisticsCard
          title="Average Working Hours"
          value={8.17}
          icon={<CalendarTickIcon />}
        />
      </div>
    </div>
  );
};

export default Statistics;
