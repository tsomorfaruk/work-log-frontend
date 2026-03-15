import React, { useMemo } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ScheduleFrequency } from "@/models/Requests/schedule";
import { TransformedRota } from "@/pages/Scheduling/Table/rota-helper";

interface EmployeeInfoCellProps {
  row: TransformedRota;
  border?: {
    columns?: boolean;
  };
  frequency: ScheduleFrequency;
}

const EmployeeInfoCell: React.FC<EmployeeInfoCellProps> = ({
  row,
  border,
  frequency,
}) => {
  const completedWorkTime = useMemo(() => {
    return (
      row?.rotas?.reduce((sum: number, item) => {
        const hours = Number(item?.job_time ?? 0);
        return sum + (Number.isFinite(hours) ? hours : 0);
      }, 0) ?? 0
    );
  }, [row]);

  const totalWorkTime = useMemo(() => {
    return frequency === "monthly" ? 4 * 40 : 40;
  }, [frequency]);

  return (
    <td className={clsx("p-4 bg-inherit", border?.columns && "border")}>
      <div>
        <Link
          to={`/employees/${row?.employee?.id}`}
          target="_blank"
          className="flex gap-1.5 items-center mb-1 text-sm 2xl:text-base leading-none text-black mb-1 hover:underline"
        >
          <Image
            src={row?.employee?.image_url!}
            name={row?.employee?.display_name}
            alt="user"
            className="w-6 min-w-6 lg:w-6 lg:min-w-6 h-6 min-h-6 lg:h-6 lg:min-h-6 rounded-full object-cover border border-[#007B99]"
          />
          <span>{row?.employee?.display_name}</span>
        </Link>

        <p
          className={clsx("text-[10px] leading-none text-[#007B99]", {
            "text-[#BA1A1A] font-semibold": completedWorkTime < totalWorkTime,
          })}
        >
          {completedWorkTime}/{totalWorkTime}
        </p>
      </div>
    </td>
  );
};

export default EmployeeInfoCell;
