import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Button from "../ui/button";
import { RightArrowIcon } from "@/assets/icons/RightArrowIcon";

export interface PaginationProps {
  total: number; // total items
  limit: number; // items per page
  offset: number; // current offset (0-based)
  currentPage: number;
  onPageChange: (page: number) => void;
  visiblePages?: number; // number of page buttons to show, default 4
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  onPageChange,
  visiblePages = 4,
  currentPage,
}) => {
  const totalPages = Math.ceil(total / limit);
  const [expanded, setExpanded] = useState(false);

  const pages = useMemo(() => {
    if (totalPages <= visiblePages || expanded) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pagesArray: number[] = [];
    const half = Math.floor(visiblePages / 2);

    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    // adjust if at start or end
    if (currentPage <= half) {
      start = 2;
      end = visiblePages;
    }
    if (currentPage + half >= totalPages) {
      start = totalPages - visiblePages + 1;
      end = totalPages - 1;
    }

    pagesArray.push(1); // always first page

    if (start > 2) {
      pagesArray.push(-1); // ellipsis
    }

    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }

    if (end < totalPages - 1) {
      pagesArray.push(-1); // ellipsis
    }

    pagesArray.push(totalPages); // always last page

    return pagesArray;
  }, [totalPages, visiblePages, currentPage, expanded]);

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  if (!totalPages) return;

  return (
    <div className="flex justify-between items-center">
      <h5 className="text-xs 2xl:text-sm">
        Showing page {currentPage} of {totalPages}{" "}
        {totalPages > 1 ? "pages" : "page"}
      </h5>

      <div className="flex items-center space-x-2">
        {/* Prev Button */}
        <Button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(
            "px-3 py-1 rounded-md border",
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200",
          )}
        >
          <RightArrowIcon className="transform rotate-180" />
        </Button>

        {/* Page Buttons */}
        {pages.map((page, idx) =>
          page === -1 ? (
            <Button
              key={idx}
              onClick={() => setExpanded(true)}
              className="px-2 py-1 border rounded-md hover:bg-gray-200"
            >
              ...
            </Button>
          ) : (
            <Button
              key={page}
              onClick={() => handleClick(page)}
              className={clsx(
                "px-3 py-1 rounded-md border",
                page === currentPage
                  ? "bg-[#007B99] text-white"
                  : "hover:bg-gray-100",
              )}
            >
              {page}
            </Button>
          ),
        )}

        {/* Next Button */}
        <Button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={clsx(
            "px-3 py-1 rounded-md border",
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200",
          )}
        >
          <RightArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
