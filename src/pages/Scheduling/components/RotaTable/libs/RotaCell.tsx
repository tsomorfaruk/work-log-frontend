import React from "react";
import clsx from "clsx";
import Button from "@/components/ui/button";
import { RotaButtonIcon } from "@/assets/icons/RotaButtonIcon";
import { EditIcon } from "@/assets/icons/EditIcon";
import { formatTimeRange, hasDatePassed } from "@/lib/date-helpers";
import { SingleRotaResponse } from "@/models/scheduling";
import { useTableContext } from "./TableContext";

interface RotaCellProps {
  currentRota: SingleRotaResponse | null;
  rowIdx: number;
  colIdx: number;
  date: string;
  employeeId: number;
  border?: {
    columns?: boolean;
  };
  isToday: boolean;
}

const RotaCell: React.FC<RotaCellProps> = ({
  currentRota,
  rowIdx,
  colIdx,
  date,
  employeeId,
  border,
  isToday,
}) => {
  const { onColumnClick, onAddClick, onEditClick, dragHandlers } =
    useTableContext();
  const { handleDragStart, handleDragOver, handleDrop } = dragHandlers;

  if (!currentRota) {
    return (
      <td
        key={`empty-${rowIdx}-${colIdx}`}
        className={clsx("p-4", border?.columns && "border", {
          "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
            isToday,
        })}
        onDragOver={handleDragOver}
        onDrop={(e) =>
          handleDrop(e, {
            id: null,
            employeeId: employeeId,
            date: date,
          })
        }
      >
        <Button>
          <RotaButtonIcon
            className={clsx("text-[#ffffff30]", {
              "cursor-not-allowed": hasDatePassed(date),
            })}
            onClick={() => {
              if (!hasDatePassed(date)) {
                onAddClick(employeeId, date);
              }
            }}
          />
        </Button>
      </td>
    );
  }

  return (
    <td
      key={`${rowIdx}-${colIdx}`}
      className={clsx("p-4", border?.columns && "border", {
        "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]": isToday,
      })}
      onClick={() => {
        if (currentRota) onColumnClick?.(currentRota);
      }}
    >
      <div
        className="bg-black rounded-2xl w-max cursor-move"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, {
            id: currentRota.id,
            employeeId: employeeId,
            date: currentRota.date,
          })
        }
        onDragOver={handleDragOver}
        onDrop={(e) =>
          handleDrop(e, {
            id: currentRota.id,
            employeeId: employeeId,
            date: currentRota.date,
          })
        }
      >
        <div className="flex gap-2 items-center bg-[#CFE6F1] px-3 py-5 text-sm leading-none text-black rounded-xl w-max ml-1">
          <p>
            {formatTimeRange({
              start: currentRota.shift_start_time,
              end: currentRota.shift_end_time,
            })}
          </p>
          {!hasDatePassed(date) && (
            <Button
              icon={<EditIcon className="size-4" />}
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(currentRota, employeeId);
              }}
            ></Button>
          )}
        </div>
      </div>
    </td>
  );
};

export default RotaCell;
