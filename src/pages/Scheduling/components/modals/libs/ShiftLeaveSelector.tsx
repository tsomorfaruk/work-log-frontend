import clsx from "clsx";
import { Plane, Cake, Stethoscope, CalendarOff } from "lucide-react";
import { Floor } from "@/models/floor";

export interface LeaveOption {
  code: string;
  label: string;
  icon: React.ReactNode;
}

interface ShiftLeaveSelectorProps {
  floors: Floor[];
  selectedShift: string | null;
  onShiftSelect: (
    shiftCode: string | null,
    startTime: string | null,
    endTime: string | null,
  ) => void;
  selectedLeave: string | null;
  onLeaveSelect: (leaveCode: string | null) => void;
}

const ShiftLeaveSelector = ({
  floors,
  selectedShift,
  onShiftSelect,
  selectedLeave,
  onLeaveSelect,
}: ShiftLeaveSelectorProps) => {
  // LD (fixed) + L{floorCode}
  const dayShifts = [
    {
      code: "LD",
      label: "LD",
      time: "08:00 - 20:00",
      start: "08:00",
      end: "20:00",
    },
    ...floors.map((f) => ({
      code: `L${f.code_name}`,
      label: `L${f.code_name}`,
      time: "08:00 - 20:00",
      start: "08:00",
      end: "20:00",
    })),
  ];

  // ND (fixed) + N{floorCode}
  const nightShifts = [
    {
      code: "ND",
      label: "ND",
      time: "20:00 - 08:00",
      start: "20:00",
      end: "08:00",
    },
    ...floors.map((f) => ({
      code: `N${f.code_name}`,
      label: `N${f.code_name}`,
      time: "20:00 - 08:00",
      start: "20:00",
      end: "08:00",
    })),
  ];

  const leaves: LeaveOption[] = [
    {
      code: "A/L",
      label: "Annual Leave",
      icon: <Plane className="w-5 h-5 mb-1 text-blue-500" />,
    },
    {
      code: "BAL",
      label: "Birthday A/L",
      icon: <Cake className="w-5 h-5 mb-1 text-pink-500" />,
    },
    {
      code: "SICK",
      label: "Sick",
      icon: <Stethoscope className="w-5 h-5 mb-1 text-red-500" />,
    },
    {
      code: "OFF",
      label: "Day Off",
      icon: <CalendarOff className="w-5 h-5 mb-1 text-gray-500" />,
    },
  ];

  const handleShiftClick = (shift: any) => {
    if (selectedShift === shift.code) {
      onShiftSelect(null, null, null);
    } else {
      onShiftSelect(shift.code, shift.start, shift.end);
      onLeaveSelect(null); // Clear leave when shift is selected
    }
  };

  const handleLeaveClick = (leave: LeaveOption) => {
    if (selectedLeave === leave.code) {
      onLeaveSelect(null);
    } else {
      onLeaveSelect(leave.code);
      onShiftSelect(null, null, null); // Clear shift when leave is selected
    }
  };

  const OptionCard = ({
    isSelected,
    onClick,
    children,
  }: {
    isSelected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center p-3 rounded-md border transition-all duration-200 w-full min-h-[80px]",
        isSelected
          ? "border-[#006972] bg-[#006972]/10 text-[#006972] shadow-sm"
          : "border-gray-200 hover:border-[#006972]/50 text-gray-700 bg-white",
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-6 w-full col-span-1 xl:col-span-3 lg:col-span-3 mb-4">
      {/* Day Shifts */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Day Shifts</h4>
        {/* <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"> */}
        {/* <div className="flex flex-wrap gap-3"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dayShifts.map((shift) => (
            <OptionCard
              key={shift.code}
              isSelected={selectedShift === shift.code}
              onClick={() => handleShiftClick(shift)}
            >
              <span className="font-semibold">{shift.label}</span>
              <span className="text-xs opacity-70 mt-1">{shift.time}</span>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* Night Shifts */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Night Shifts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nightShifts.map((shift) => (
            <OptionCard
              key={shift.code}
              isSelected={selectedShift === shift.code}
              onClick={() => handleShiftClick(shift)}
            >
              <span className="font-semibold">{shift.label}</span>
              <span className="text-xs opacity-70 mt-1">{shift.time}</span>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* Leave / Off */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Leave / Off</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {leaves.map((leave) => (
            <OptionCard
              key={leave.code}
              isSelected={selectedLeave === leave.code}
              onClick={() => handleLeaveClick(leave)}
            >
              <div className="flex gap-2 items-center">
                {leave.icon}
                <p className="font-semibold">{leave.code}</p>
              </div>
              <p className="text-xs opacity-70 mt-1 text-center">
                {leave.label}
              </p>
            </OptionCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftLeaveSelector;
