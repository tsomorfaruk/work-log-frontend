import React from "react";
import clsx from "clsx";

export interface SkeletonLayoutItem {
  colSpan?: number;
  rowSpan?: number;
}

export interface FormSkeletonProps {
  itemCount: number;
  columns?: number;
  layout?: SkeletonLayoutItem[];
  isLabelEnabled?: boolean;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({
  itemCount,
  columns = 2,
  layout = [],
  isLabelEnabled,
}) => {
  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: itemCount }).map((_, index) => {
        const config = layout[index] ?? {};

        return (
          <div
            key={index}
            className={clsx(
              "space-y-2",
              config.colSpan && `col-span-${config.colSpan}`,
              config.rowSpan && `row-span-${config.rowSpan}`
            )}
          >
            {/* label skeleton */}
            {isLabelEnabled && (
              <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
            )}

            {/* input skeleton */}
            <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
          </div>
        );
      })}
    </div>
  );
};

export default FormSkeleton;
