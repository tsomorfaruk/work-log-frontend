import Button from "@/components/ui/button";

const Announcement = () => {
  return (
    <div className="card-wrapper w-full lg:w-[61%]">
      <div className="flex flex-wrap gap-3 lg:gap-6 justify-between mb-6">
        <h4 className="card-title">Announcement</h4>
        <div>
          <Button variant="primary">View All</Button>
        </div>
      </div>

      <p>Cards will go here</p>
    </div>
  );
};

export default Announcement;
