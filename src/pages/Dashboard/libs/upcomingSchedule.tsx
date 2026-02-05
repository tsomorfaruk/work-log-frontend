import Button from "@/components/ui/button";

const UpcomingSchedule = () => {
  return (
    <div className="card-wrapper w-full lg:w-[61%]">
      <div className="flex flex-wrap gap-3 lg:gap-6 justify-between mb-6">
        <h4 className="card-title">Upcoming Schedule</h4>
        <div>
          <Button variant="primary">View All</Button>
        </div>
      </div>

      <p>Cards will go here</p>
    </div>
  );
};

export default UpcomingSchedule;
