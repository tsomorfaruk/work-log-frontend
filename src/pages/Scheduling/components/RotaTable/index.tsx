import React, { useMemo, useState } from "react";
import clsx from "clsx";
import Pagination, { PaginationProps } from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import {
  AlterSchedulingPayload,
  SingleRotaResponse,
} from "@/models/scheduling";
import { convertTo24Hour, createDateRange, isToday } from "@/lib/date-helpers";
import RotaModal from "../modals";
import { ScheduleFrequency } from "@/models/Requests/schedule";
import { TransformedRotaResponse } from "../../Table/rota-helper";
import { useSwapScheduleMutation } from "@/services/scheduling";
import RotaTableHeader from "./libs/RotaTableHeader";
import RotaTableRow from "./libs/RotaTableRow";
import { TableProvider } from "./libs/TableContext";

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  width?: string | number;
  className?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (row: T, value: T[keyof T]) => React.ReactNode;
  dataType?: "none" | "currency" | "date";
}

export interface TableProps {
  data: TransformedRotaResponse;
  striped?: boolean;
  border?: {
    table?: boolean;
    rows?: boolean;
    columns?: boolean;
  };
  className?: string;
  isError?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  pagination?: PaginationProps;
  showSerial?: boolean;
  onColumnClick?: (col: SingleRotaResponse | null) => void;
  frequency: ScheduleFrequency;
}

const RotaTable = ({
  data,
  border = { table: true, rows: true, columns: true },
  className,
  isError,
  isLoading,
  isFetching,
  pagination,
  showSerial = false,
  onColumnClick,
  frequency,
}: TableProps) => {
  const dateColHeaders = createDateRange({
    start: data?.start_date,
    end: data?.end_date,
  });

  const colIndexToday = dateColHeaders?.findIndex((item) => isToday(item));

  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [defaultRotaValue, setDefaultRotaValue] =
    useState<Partial<AlterSchedulingPayload> | null>(null);
  const [rotaId, setRotaId] = useState<number>();
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    employeeId: number;
    date: string;
  } | null>(null);

  const [swapSchedule] = useSwapScheduleMutation();

  const handleDragStart = (
    e: React.DragEvent,
    item: { id: number; employeeId: number; date: string },
  ) => {
    setDraggedItem(item);
    e.dataTransfer.setData("text/plain", item.id.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (
    e: React.DragEvent,
    targetItem: { id: number | null; employeeId: number; date: string },
  ) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    try {
      await swapSchedule({
        source_id: draggedItem.id,
        target_id: targetItem.id,
        target_employee_id: targetItem.id ? undefined : targetItem.employeeId,
        target_date: targetItem.id ? undefined : targetItem.date,
      }).unwrap();
    } catch (error) {
      console.error("Failed to swap schedules:", error);
    } finally {
      setDraggedItem(null);
    }
  };

  const handleAddClick = (empId: number, date: string) => {
    setEmployeeId(empId);
    setIsOpen(true);
    setDefaultRotaValue({
      employee_id: empId,
      date: date,
    });
  };

  const handleEditClick = (rota: SingleRotaResponse, empId: number) => {
    setIsOpen(true);
    setDefaultRotaValue({
      employee_id: empId,
      date: rota.date,
      start_time: convertTo24Hour(rota.shift_start_time)!,
      end_time: convertTo24Hour(rota.shift_end_time)!,
      notes: rota.remarks,
    });
    setRotaId(rota.id);
  };

  const tableContextValue = useMemo(
    () => ({
      onColumnClick,
      onAddClick: handleAddClick,
      onEditClick: handleEditClick,
      dragHandlers: { handleDragStart, handleDragOver, handleDrop },
    }),
    [onColumnClick, handleDragStart, handleDragOver, handleDrop],
  );

  return (
    <TableProvider value={tableContextValue}>
      {isOpen && (
        <RotaModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          employeeId={employeeId}
          defaultValue={defaultRotaValue}
          rotaId={rotaId}
        />
      )}
      <div className="shadow-custom-1 border-b-[#CFE6F1] rounded-2xl bg-[#F2FCFF]">
        <div
          className={clsx(
            "overflow-x-auto",
            isFetching && !isLoading && "opacity-70 blur-[2px] transition-all",
          )}
          style={{ scrollbarWidth: "thin" }}
        >
          <table
            className={clsx(
              "table-auto text-sm w-full overflow-hidden",
              {
                "rounded-2xl": !pagination,
                "rounded-tl-2xl rounded-tr-2xl": !!pagination,
              },
              border.table && "border border-[#CFE6F1]",
              className,
            )}
          >
            <RotaTableHeader
              showSerial={showSerial}
              border={border}
              dateColHeaders={dateColHeaders}
              colIndexToday={colIndexToday}
            />

            <tbody>
              {isError ? (
                <tr className="h-32">
                  <td className="text-sm lg:text-base font-semibold text-center text-danger py-4">
                    <p>Error Occurred</p>
                  </td>
                </tr>
              ) : isLoading ? (
                <tr className="h-32">
                  <td
                    colSpan={Math.min(dateColHeaders.length + 2, 11)}
                    className="text-sm lg:text-base font-semibold text-center text-danger py-4"
                  >
                    <Spinner />
                  </td>
                </tr>
              ) : //  isFetching ? (
              //   <tr className="h-32">
              //     <td className="text-sm lg:text-base font-semibold text-center text-danger py-4">
              //       <Spinner />
              //     </td>
              //   </tr>
              // ) :
              data?.data?.length === 0 ? (
                <tr className="h-32">
                  <td
                    className="text-sm lg:text-base font-semibold text-center text-danger py-4"
                    colSpan={Math.min(dateColHeaders.length + 2, 11)}
                  >
                    <p>OOPS! No data found 🙁</p>
                  </td>
                </tr>
              ) : (
                data?.data?.map((row, rowIdx) => (
                  <RotaTableRow
                    key={rowIdx}
                    row={row}
                    rowIdx={rowIdx}
                    showSerial={showSerial}
                    border={border}
                    dateColHeaders={dateColHeaders}
                    colIndexToday={colIndexToday}
                    pagination={pagination}
                    frequency={frequency}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        {pagination && !isLoading && !isError && (
          <div className="mt-4 mb-6 mx-6">
            <Pagination {...pagination} />
          </div>
        )}
      </div>
    </TableProvider>
  );
};

export default RotaTable;
