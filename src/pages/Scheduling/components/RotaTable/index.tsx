import React, { useMemo, useState } from "react";
import clsx from "clsx";
import Pagination, { PaginationProps } from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import {
  AlterSchedulingPayload,
  SingleRotaResponse,
} from "@/models/scheduling";
import Button from "@/components/ui/button";
import { RotaButtonIcon } from "@/assets/icons/RotaButtonIcon";
import {
  convertTo24Hour,
  createDateRange,
  formatDate,
  formatTimeRange,
  hasDatePassed,
  isToday,
} from "@/lib/date-helpers";
import RotaModal from "../modals";
import { ScheduleFrequency } from "@/models/Requests/schedule";
import { EditIcon } from "@/assets/icons/EditIcon";
import { TransformedRotaResponse } from "../../Table/rota-helper";
import { Link } from "react-router-dom";

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

  const allEmployeeRotas = data?.data;

  const colIndexToday = dateColHeaders?.findIndex((item) => isToday(item));

  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const completedWorkTime = useMemo(() => {
    return (
      data?.data?.[0]?.rotas?.reduce((sum, item) => {
        const hours = Number(item?.total_hours);
        return sum + (Number.isFinite(hours) ? hours : 0);
      }, 0) ?? 0
    );
  }, [data]);

  const totalWorkTime = useMemo(() => {
    if (frequency === "monthly") {
      return 4 * 40;
    }
    return 40;
  }, [frequency]);

  const [defaultRotaValue, setDefaultRotaValue] =
    useState<Partial<AlterSchedulingPayload> | null>(null);

  const [rotaId, setRotaId] = useState<number>();

  return (
    <>
      {isOpen && (
        <RotaModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          employeeId={employeeId}
          defaultValue={defaultRotaValue}
          rotaId={rotaId}
        />
      )}
      <div
        className={clsx(
          "overflow-x-auto shadow-custom-1 border-b-[#CFE6F1] rounded-2xl bg-[#F2FCFF]",
          isFetching && !isLoading && "opacity-70 blur-[2px] transition-all",
        )}
        style={{
          scrollbarWidth: "thin",
        }}
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
          <thead>
            <tr className="bg-CFE6F1 h-16 2xl:h-20">
              {showSerial && (
                <th
                  className={clsx(
                    "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
                    border.columns && "border",
                  )}
                >
                  <div
                    className={clsx("flex items-center gap-1 w-2.5 min-w-2.5")}
                  >
                    <p>SL</p>
                  </div>
                </th>
              )}

              <th
                className={clsx(
                  "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
                  border.columns && "border",
                )}
              >
                {/* <div className={clsx("flex items-center gap-1 w-2.5 min-w-2.5")}> */}
                <p className="text-sm 2xl:text-base font-bold text-[#354A53] capitalize select-none">
                  Employee
                </p>
                <p className="text-[10px] leading-none text-black">
                  Total Hours
                </p>
                {/* </div> */}
              </th>

              {dateColHeaders.map((col, colIdx) => (
                <th
                  key={colIdx}
                  className={clsx(
                    "px-7 text-sm 2xl:text-base font-bold text-[#354A53] capitalize select-none",
                    border.columns && "border",
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
                  // colSpan={columns.length} // must find
                  className="text-sm lg:text-base font-semibold text-center text-danger py-4"
                >
                  <Spinner />
                </td>
              </tr>
            ) : isFetching ? (
              <tr className="h-32">
                <td className="text-sm lg:text-base font-semibold text-center text-danger py-4">
                  <Spinner />
                </td>
              </tr>
            ) : (
              // data?.data?.rotas?.map((row, rowIdx) => {
              data?.data?.map((row, rowIdx) => {
                return (
                  <tr
                    key={rowIdx}
                    className={clsx(
                      "bg-F2FCFF border-b border-b-[#CFE6F1]",
                      border.rows && "border-b border-[#CFE6F1]",
                    )}
                  >
                    {showSerial && (
                      <td
                        className={clsx(
                          "p-4 bg-inherit",
                          border.columns && "border",
                        )}
                      >
                        {!pagination?.currentPage && !pagination?.limit
                          ? rowIdx + 1
                          : (pagination?.currentPage - 1) * pagination?.limit +
                            (rowIdx + 1)}
                      </td>
                    )}

                    <td
                      className={clsx(
                        "p-4 bg-inherit",
                        border.columns && "border",
                      )}
                    >
                      <div className="flex gap-x-1.5 items-center">
                        <div>
                          <Link
                            to={`/employees/${row?.employee?.id}`}
                            target="_blank"
                            className="text-sm 2xl:text-base leading-none text-black mb-1 hover:underline"
                          >
                            {row?.employee?.display_name}
                          </Link>
                          {completedWorkTime !== undefined && (
                            <p
                              className={clsx(
                                "text-[10px] leading-none text-[#007B99]",
                                {
                                  "text-[#BA1A1A] font-semibold":
                                    completedWorkTime < totalWorkTime,
                                },
                              )}
                            >
                              {completedWorkTime}/{totalWorkTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {allEmployeeRotas?.[rowIdx]?.rotas?.map(
                      (currentRota, colIdx) => {
                        if (!currentRota) {
                          return (
                            <td
                              key={`empty-${rowIdx}-${colIdx}`}
                              className={clsx(
                                "p-4",
                                border.columns && "border",
                                {
                                  "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
                                    colIdx === colIndexToday,
                                },
                              )}
                              onClick={() => {
                                onColumnClick?.(currentRota);
                              }}
                            >
                              <Button>
                                <RotaButtonIcon
                                  className={clsx("text-[#ffffff30]", {
                                    "cursor-not-allowed": hasDatePassed(
                                      dateColHeaders[colIdx],
                                    ),
                                  })}
                                  onClick={() => {
                                    if (
                                      !hasDatePassed(dateColHeaders[colIdx])
                                    ) {
                                      setEmployeeId(+row.employeeId);
                                      setIsOpen(true);

                                      const currentRotaData: Partial<AlterSchedulingPayload> =
                                        {
                                          employee_id: +row?.employeeId,
                                          date: dateColHeaders[colIdx],
                                        };

                                      setDefaultRotaValue(currentRotaData);
                                    }
                                  }}
                                />
                              </Button>
                            </td>
                          );
                        }

                        // const rotaTime = `${currentRota.shift_start_time} - ${currentRota.shift_end_time}`;

                        return (
                          <td
                            key={`${rowIdx}-${colIdx}`}
                            className={clsx("p-4", border.columns && "border", {
                              "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
                                colIdx === colIndexToday,
                            })}
                            onClick={() => {
                              if (currentRota) onColumnClick?.(currentRota);
                            }}
                          >
                            <div className="bg-black rounded-2xl w-max">
                              <div className="flex gap-2 items-center bg-[#CFE6F1] px-3 py-5 text-sm leading-none text-black rounded-xl w-max ml-1">
                                {/* <p>{rotaTime}</p> */}
                                <p>
                                  {formatTimeRange({
                                    start: currentRota.shift_start_time,
                                    end: currentRota.shift_end_time,
                                  })}
                                </p>
                                {!hasDatePassed(dateColHeaders[colIdx]) && (
                                  <Button
                                    icon={<EditIcon className="size-4" />}
                                    onClick={() => {
                                      setIsOpen(true);

                                      // const xxxxxxxxxxxxxxx
                                      const currentRotaData: AlterSchedulingPayload =
                                        {
                                          employee_id: +row?.employeeId,
                                          date: currentRota?.date,
                                          start_time: convertTo24Hour(
                                            currentRota?.shift_start_time,
                                          )!,
                                          end_time: convertTo24Hour(
                                            currentRota?.shift_end_time,
                                          )!,
                                          notes: currentRota?.remarks,
                                        };

                                      setDefaultRotaValue(currentRotaData);
                                      setRotaId(currentRota?.id);
                                    }}
                                  ></Button>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      },
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {pagination && !isLoading && !isError && (
          <div className="my-3 mx-6">
            <Pagination {...pagination} />
          </div>
        )}
      </div>
    </>
  );
};

export default RotaTable;
