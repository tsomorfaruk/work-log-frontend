import Button from "@/components/ui/button";

const ShiftManagement = () => {
  return (
    <div className="card-wrapper w-full lg:w-[39%]">
      <div className="flex flex-wrap gap-3 lg:gap-6 justify-between mb-6">
        <h4 className="card-title">Shift Management</h4>
        <div>
          <Button variant="primary">View Report</Button>
        </div>
      </div>

      <p>Chart</p>
    </div>
  );
};

export default ShiftManagement;
