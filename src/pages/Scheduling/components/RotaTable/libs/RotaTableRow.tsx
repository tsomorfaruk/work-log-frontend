import React from "react";
import clsx from "clsx";
import EmployeeInfoCell from "./EmployeeInfoCell";
import RotaCell from "./RotaCell";
import { SingleRotaResponse } from "@/models/scheduling";
import { PaginationProps } from "@/components/common/Pagination";
import { ScheduleFrequency } from "@/models/Requests/schedule";
import { TransformedRota } from "@/pages/Scheduling/Table/rota-helper";

interface RotaTableRowProps {
  row: TransformedRota;
  rowIdx: number;
  showSerial?: boolean;
  border?: {
    rows?: boolean;
    columns?: boolean;
  };
  dateColHeaders: string[];
  colIndexToday: number;
  pagination?: PaginationProps;
  frequency: ScheduleFrequency;
}

const RotaTableRow: React.FC<RotaTableRowProps> = ({
  row,
  rowIdx,
  showSerial,
  border,
  dateColHeaders,
  colIndexToday,
  pagination,
  frequency,
}) => {
  return (
    <tr
      key={rowIdx}
      className={clsx(
        "bg-F2FCFF border-b border-b-[#CFE6F1]",
        border?.rows && "border-b border-[#CFE6F1]",
      )}
    >
      {showSerial && (
        <td className={clsx("p-4 bg-inherit", border?.columns && "border")}>
          {!pagination?.currentPage && !pagination?.limit
            ? rowIdx + 1
            : (pagination?.currentPage - 1) * (pagination?.limit ?? 0) +
              (rowIdx + 1)}
        </td>
      )}

      <EmployeeInfoCell row={row} border={border} frequency={frequency} />

      {row?.rotas?.map(
        (currentRota: SingleRotaResponse | null, colIdx: number) => (
          <RotaCell
            key={`${rowIdx}-${colIdx}`}
            currentRota={currentRota}
            rowIdx={rowIdx}
            colIdx={colIdx}
            date={dateColHeaders[colIdx]}
            employeeId={+row.employeeId}
            border={border}
            isToday={colIdx === colIndexToday}
          />
        ),
      )}
    </tr>
  );
};

export default RotaTableRow;
