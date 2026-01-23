import React from "react";
import clsx from "clsx";
import Pagination, { PaginationProps } from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";
import { TransformedSchedulingResponse } from "@/models/scheduling";
import Button from "@/components/ui/button";
import { RotaButtonIcon } from "@/assets/icons/RotaButtonIcon";
import { formatDate, hasDatePassed, isToday } from "@/lib/date-helpers";

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
  data: TransformedSchedulingResponse;

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
}: TableProps) => {
  const dateColHeaders = data?.data?.rotas?.[0]?.rotas?.map(
    (item) => item.date,
  );

  const allEmployeeRotas = data?.data?.rotas?.map((employeeRotas) => {
    return employeeRotas.rotas.map((item) => item.rota);
  });

  const colIndexToday = data?.data?.rotas?.[0]?.rotas?.findIndex((item) =>
    isToday(item?.date),
  );

  // const totalWorkTime = data?.data?.rotas?.[0]?.rotas?.reduce(
  //   (a, c) => {
  //     return a + (c?.rota?.total_hours ? +c?.rota?.total_hours : 0);
  //   },
  //   [0],
  // );

  // console.log("totalWorkTime: ", totalWorkTime);

  return (
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
              <p className="text-[10px] leading-none text-black">Total Hours</p>
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
            data?.data?.rotas?.map((row, rowIdx) => (
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
                  className={clsx("p-4 bg-inherit", border.columns && "border")}
                >
                  <div className="flex gap-x-1.5 items-center">
                    <div>
                      <img
                        src="to be written"
                        className="size-[30px] border border-[#007B99] rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm 2xl:text-base leading-none text-black">
                        {row?.employee?.display_name}
                      </p>
                      <p className="text-[10px] leading-none text-black">
                        25/25/40
                      </p>
                    </div>
                  </div>
                </td>

                {allEmployeeRotas?.[rowIdx]?.map((currentRota, colIdx) => {
                  if (!currentRota) {
                    return (
                      <td
                        key={`empty-${rowIdx}-${colIdx}`}
                        className={clsx("p-4", border.columns && "border", {
                          "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
                            colIdx === colIndexToday,
                        })}
                      >
                        <Button>
                          <RotaButtonIcon
                            className={clsx("text-[#ffffff30]", {
                              "cursor-not-allowed": hasDatePassed(
                                dateColHeaders[colIdx],
                              ),
                            })}
                          />
                        </Button>
                      </td>
                    );
                  }

                  const rotaTime = `${currentRota.shift_start_time} - ${currentRota.shift_end_time}`;

                  return (
                    <td
                      key={`${rowIdx}-${colIdx}`}
                      className={clsx("p-4", border.columns && "border", {
                        "bg-[#00E1FF] bg-opacity-20 border-x-[3px] border-x-[#00E1FF]":
                          colIdx === colIndexToday,
                      })}
                    >
                      <div className="bg-black rounded-2xl w-max">
                        <p className="bg-[#CFE6F1] px-3 py-5 text-sm leading-none text-black rounded-xl w-max ml-1">
                          {rotaTime}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && !isLoading && !isError && (
        <div className="my-3 mx-6">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export default RotaTable;
