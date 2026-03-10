import React from "react";
import clsx from "clsx";
import { Floor } from "@/models/floor";
import { Department } from "@/models/shared";

interface FloorDepartmentFilterProps {
  floors: Floor[];
  departments: Department[];
  selectedFloorId?: string | number;
  selectedDepartmentId?: string | number;
  onChange: (floorId?: string | number, departmentId?: string | number) => void;
}

const FloorDepartmentFilter: React.FC<FloorDepartmentFilterProps> = ({
  floors,
  departments,
  selectedFloorId,
  selectedDepartmentId,
  onChange,
}) => {
  if (!floors?.length || !departments?.length) return null;

  return (
    <div className="flex overflow-x-auto gap-3 py-2 scrollbar-hide">
      {floors.map((floor) =>
        departments.map((dept) => {
          const isActive =
            selectedFloorId === floor.id && selectedDepartmentId === dept.id;

          return (
            <button
              key={`${floor.id}-${dept.id}`}
              onClick={() => {
                if (isActive) {
                  // Deselect
                  onChange(undefined, undefined);
                } else {
                  // Select
                  onChange(floor.id, dept.id);
                }
              }}
              className={clsx(
                "whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#E6F3F9] border-[#0A7398] text-[#0A7398]" // Using colors similar to Navbar active state as requested
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50",
              )}
            >
              {floor.code_name} {dept.display_name}
            </button>
          );
        }),
      )}
    </div>
  );
};

export default FloorDepartmentFilter;
