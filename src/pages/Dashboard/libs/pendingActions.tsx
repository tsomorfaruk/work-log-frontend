import { AirplaneIcon } from "@/assets/icons/AirplaneIcon";
import { ArrowDownFloatIcon } from "@/assets/icons/ArrowDownFloatIcon";
import { ArrowVerticalIcon } from "@/assets/icons/ArrowVerticalIcon";
import { TimeScheduleIcon } from "@/assets/icons/TimeScheduleIcon";
import Button from "@/components/ui/button";

const PendingActions = () => {
  return (
    <div className="card-wrapper w-full lg:w-[29%]">
      <h4 className="card-title mb-5">Pending Actions</h4>

      <div className="space-y-3 lg:space-y-6">
        <Button
          icon={
            <div className="bg-[#CFE6F1] size-9 rounded-xl flex justify-center items-center">
              <ArrowVerticalIcon />
            </div>
          }
        >
          5 Swap Shift Requests
        </Button>
        <Button
          icon={
            <div className="bg-[#CFE6F1] size-9 rounded-xl flex justify-center items-center">
              <TimeScheduleIcon />
            </div>
          }
        >
          0 Open Shift Requests
        </Button>
        <Button
          icon={
            <div className="bg-[#CFE6F1] size-9 rounded-xl flex justify-center items-center">
              <ArrowDownFloatIcon />
            </div>
          }
        >
          1 Handover Shift Requests
        </Button>
        <Button
          icon={
            <div className="bg-[#CFE6F1] size-9 rounded-xl flex justify-center items-center">
              <AirplaneIcon />
            </div>
          }
        >
          0 Absence Requests
        </Button>
      </div>
    </div>
  );
};

export default PendingActions;
