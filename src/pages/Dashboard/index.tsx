import Announcement from "./libs/announcement";
import AttendanceComparison from "./libs/attendanceComparison";
import PendingActions from "./libs/pendingActions";
import QuickActions from "./libs/quickActions";
import ShiftManagement from "./libs/shiftManagement";
import Statistics from "./libs/statistics";
import UpcomingSchedule from "./libs/upcomingSchedule";

export default function Home() {
  return (
    <section className="space-y-3 lg:space-y-6">
      <QuickActions />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-start">
        <PendingActions />
        <Statistics />
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-center">
        <ShiftManagement />
        <AttendanceComparison />
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 items-center">
        <Announcement />
        <UpcomingSchedule />
      </div>
    </section>
  );
}
