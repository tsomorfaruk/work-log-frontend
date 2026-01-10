import React, { useState } from "react";
import clsx from "clsx";
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
  textColor?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];

  striped?: boolean;
  evenBg?: string;
  oddBg?: string;

  border?: {
    table?: boolean;
    rows?: boolean;
    columns?: boolean;
  };

  pagination?: {
    enabled: boolean;
    limit: number;
    offset: number;
    onChange?: (page: number) => void;
  };

  scrollColor?: string;
  className?: string;
  isError?: boolean;
  isLoading?: boolean;
}

const Table = <T extends object>({
  columns,
  data,
  striped = false,
  evenBg = "bg-F2FCFF",
  oddBg = "bg-F2FCFF",
  border = { table: true, rows: true, columns: true },
  pagination = { enabled: false, limit: 10, offset: 0 },
  scrollColor = "#27d6f5",
  className,
  isError,
  isLoading,
}: TableProps<T>) => {
  // Sorting state
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

  // Sorted data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key!];
      const valB = b[sortConfig.key!];

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig.key, sortConfig.direction]);

  // Paginated data
  const paginatedData = React.useMemo(() => {
    if (!pagination.enabled) return sortedData;
    const start = pagination.offset * pagination.limit;
    return sortedData.slice(start, start + pagination.limit);
  }, [sortedData, pagination]);

  return (
    <div
      className={clsx(
        "overflow-x-auto shadow-custom-1 border-b-[#C0C8CC] rounded-2xl"
      )}
      style={{
        scrollbarColor: `${scrollColor} transparent`,
        scrollbarWidth: "thin",
      }}
    >
      <table
        className={clsx(
          "table-auto text-sm w-full rounded-2xl overflow-hidden",
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
                  // "px-2 py-2 text-sm 2xl:text-base font-semibold capitalize select-none",
                  "px-7 text-sm 2xl:text-base font-bold capitalize select-none",
                  border.columns && "border",
                  col.className
                  // { " bg-red-400": colIdx === 5 }
                  // { "sticky left-0 z-10 bg-gray-300": colIdx === 0 }
                )}
                style={{
                  width: col.width,
                  minWidth: col.width,
                  // color: col?.textColor
                  // color: col.textColor ?? undefined,
                  color: col?.textColor ? `var(${col.textColor})` : "inherit",
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
                <p>OOPS! No data found 🙁</p>
              </td>
            </tr>
          ) : isLoading ? (
            <tr className="h-32">
              <td
                colSpan={columns.length}
                className="text-sm lg:text-base font-semibold text-center text-danger py-4"
              >
                <p>OOPS! No data found 🙁</p>
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
                  striped ? (rowIdx % 2 === 0 ? oddBg : evenBg) : undefined,
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
                        color: col?.textColor
                          ? `var(${col.textColor})`
                          : "inherit",
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

      {/* {pagination.enabled && (
        <div className="flex items-center justify-between mt-2">
          <Button
            disabled={pagination.offset === 0}
            onClick={() => pagination.onChange?.(pagination.offset - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {pagination.offset + 1} / {Math.ceil(sortedData.length / pagination.limit)}
          </span>

          <Button
            disabled={(pagination.offset + 1) * pagination.limit >= sortedData.length}
            onClick={() => pagination.onChange?.(pagination.offset + 1)}
          >
            Next
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default Table;
