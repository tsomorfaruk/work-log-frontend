import React, { useState } from "react";
import clsx from "clsx";
import Spinner from "../Spinner";
import Pagination, { PaginationProps } from "../Pagination";
// import Button from '../Button';

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

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];

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
}

const Table = <T extends object>({
  columns,
  data,
  border = { table: true, rows: true, columns: true },
  className,
  isError,
  isLoading,
  isFetching,
  pagination,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const toggleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    setSortConfig((prev) => ({
      key: col.key,
      direction:
        prev.key === col.key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const paginatedData = data;

  return (
    <div
      className={clsx(
        "overflow-x-auto shadow-custom-1 border-b-[#C0C8CC] rounded-2xl bg-[#F2FCFF]",
        isFetching && !isLoading && "opacity-70 blur-[2px] transition-all"
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
          border.table && "border border-gray-300",
          className
        )}
      >
        <thead>
          <tr className="bg-CFE6F1 h-16 2xl:h-20">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => toggleSort(col)}
                className={clsx(
                  "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
                  border.columns && "border",
                  col.className
                )}
                style={{
                  width: col.width,
                  minWidth: col.width,
                }}
              >
                <div
                  className={clsx("flex items-center gap-1", {
                    "justify-center": col.align === "center",
                    "justify-end": col.align === "right",
                  })}
                >
                  <p>{col.header}</p>
                  {col.sortable && (
                    <>
                      {sortConfig.key !== col.key && <span>↕</span>}
                      {sortConfig.key === col.key &&
                        (sortConfig.direction === "asc" ? (
                          <span>↑</span>
                        ) : (
                          <span>↓</span>
                        ))}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isError ? (
            <tr className="h-32">
              <td
                colSpan={columns.length}
                className="text-sm lg:text-base font-semibold text-center text-danger py-4"
              >
                <p>Error Occurred</p>
              </td>
            </tr>
          ) : isLoading ? (
            <tr className="h-32">
              <td
                colSpan={columns.length}
                className="text-sm lg:text-base font-semibold text-center text-danger py-4"
              >
                <Spinner />
              </td>
            </tr>
          ) : isFetching ? (
            <tr className="h-32">
              <td
                colSpan={columns.length}
                className="text-sm lg:text-base font-semibold text-center text-danger py-4"
              >
                <Spinner />
              </td>
            </tr>
          ) : !paginatedData?.length ? (
            <tr className="h-32">
              <td
                colSpan={columns.length}
                className="text-sm lg:text-base font-semibold text-center text-danger py-4"
              >
                <p>OOPS! No data found 🙁</p>
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={clsx(
                  "bg-F2FCFF border-b border-b-[#C0C8CC]",
                  border.rows && "border-b border-gray-300"
                )}
              >
                {columns.map((col, colIdx) => {
                  const value = row[col.key];

                  return (
                    <td
                      key={String(col.key)}
                      className={clsx(
                        // "px-2 py-2 bg-inherit",
                        "px-7 py-6 bg-inherit",

                        border.columns && "border",
                        col.className,
                        { "sticky left-0 z-10": colIdx === 0 },
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right"
                      )}
                      style={{
                        width: col.width,
                      }}
                    >
                      {col.render ? col.render(row, value) : String(value)}
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

export default Table;
