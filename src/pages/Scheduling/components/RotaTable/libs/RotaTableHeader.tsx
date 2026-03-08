import React from "react";
import clsx from "clsx";
import { formatDate } from "@/lib/date-helpers";

interface RotaTableHeaderProps {
  showSerial?: boolean;
  border?: {
    columns?: boolean;
  };
  dateColHeaders: string[];
  colIndexToday: number;
}

const RotaTableHeader: React.FC<RotaTableHeaderProps> = ({
  showSerial,
  border,
  dateColHeaders,
  colIndexToday,
}) => {
  return (
    <thead>
      <tr className="bg-CFE6F1 h-16 2xl:h-20">
        {showSerial && (
          <th
            className={clsx(
              "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
              border?.columns && "border",
            )}
          >
            <div className={clsx("flex items-center gap-1 w-2.5 min-w-2.5")}>
              <p>SL</p>
            </div>
          </th>
        )}

        <th
          className={clsx(
            "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
            border?.columns && "border",
          )}
        >
          <p className="text-sm 2xl:text-base font-bold text-[#354A53] capitalize select-none">
            Employee
          </p>
          <p className="text-[10px] leading-none text-black">Total Hours</p>
        </th>

        {dateColHeaders.map((col, colIdx) => (
          <th
            key={colIdx}
            className={clsx(
              "px-7 text-sm 2xl:text-base font-bold text-[#354A53] capitalize select-none",
              border?.columns && "border",
              {
                "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
                  colIdx === colIndexToday,
              },
            )}
          >
            <p className="min-w-max">{formatDate(col)}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default RotaTableHeader;
