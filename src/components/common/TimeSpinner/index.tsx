import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";

interface TimeSpinnerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  hasError?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
  placeholder?: string;
}

const ITEM_HEIGHT = 40; // px per row
const VISIBLE_ITEMS = 5; // rows shown; centre = selected

function buildList(count: number) {
  return Array.from({ length: count }, (_, i) => String(i).padStart(2, "0"));
}

const HOURS = buildList(24);
const MINUTES = buildList(60);

interface ColumnProps {
  items: string[];
  selected: number;
  onSelect: (idx: number) => void;
  label: string;
  disabled?: boolean;
}

const Column: React.FC<ColumnProps> = ({
  items,
  selected,
  onSelect,
  label,
  disabled,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to the selected item on mount and whenever selected changes
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = selected * ITEM_HEIGHT;
  }, [selected]);

  const handleScroll = useCallback(() => {
    if (!listRef.current || disabled) return;

    const newIdx = Math.round(listRef.current.scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(items.length - 1, newIdx));
    if (clamped !== selected) {
      onSelect(clamped);
    }
  }, [items.length, onSelect, disabled, selected]);

  // Snap on scroll end
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScrollHandler = useCallback(() => {
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => {
      handleScroll();
      if (listRef.current) {
        const idx = Math.round(listRef.current.scrollTop / ITEM_HEIGHT);
        listRef.current.scrollTo({
          top: idx * ITEM_HEIGHT,
          behavior: "smooth",
        });
      }
    }, 150);
  }, [handleScroll]);

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
        {label}
      </span>

      <div
        className="relative group overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 shadow-inner"
        style={{
          height: ITEM_HEIGHT * VISIBLE_ITEMS,
          width: 60,
        }}
      >
        {/* Highlight band in the centre */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-10 border-y border-primary-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          style={{
            top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
            height: ITEM_HEIGHT,
          }}
        />

        {/* Fading Gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-gradient-to-b from-gray-50/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-gray-50/90 to-transparent" />

        <div
          ref={listRef}
          onScroll={onScrollHandler}
          className={cn(
            "overflow-y-scroll scrollbar-hide relative",
            disabled && "pointer-events-none opacity-50",
          )}
          style={{
            height: ITEM_HEIGHT * VISIBLE_ITEMS,
            scrollSnapType: "y mandatory",
          }}
        >
          {/* Top padding */}
          <div
            style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) }}
          />

          {items.map((item, idx) => (
            <div
              key={item}
              onClick={() => {
                if (disabled) return;
                onSelect(idx);
                listRef.current?.scrollTo({
                  top: idx * ITEM_HEIGHT,
                  behavior: "smooth",
                });
              }}
              style={{ height: ITEM_HEIGHT, scrollSnapAlign: "start" }}
              className={cn(
                "flex items-center justify-center cursor-pointer font-mono transition-all duration-300",
                idx === selected
                  ? "text-black font-bold"
                  : "text-gray-600 text-sm opacity-80 hover:opacity-100",
              )}
            >
              {item}
            </div>
          ))}

          {/* Bottom padding */}
          <div
            style={{ height: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2) }}
          />
        </div>
      </div>
    </div>
  );
};

const TimeSpinner: React.FC<TimeSpinnerProps> = ({
  value,
  onChange,
  className,
  hasError,
  disabled,
  size = "md",
  placeholder = "Select Time",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hour = value ? value.getHours() : 0;
  const minute = value ? value.getMinutes() : 0;

  const handleHourChange = (h: number) => {
    const next = value ? new Date(value) : new Date();
    next.setHours(h, value ? value.getMinutes() : 0, 0, 0);
    onChange(next);
  };

  const handleMinuteChange = (m: number) => {
    const next = value ? new Date(value) : new Date();
    next.setHours(value ? value.getHours() : 0, m, 0, 0);
    onChange(next);
  };

  const formattedTime = value
    ? `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    : "";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex items-center justify-between gap-2 border rounded-lg bg-white px-3 py-1 w-full text-left transition-all hover:bg-gray-50/50",
            hasError
              ? "border-danger ring-danger/20"
              : "border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 hover:border-gray-300",
            size === "sm" ? "min-h-9 text-xs" : "min-h-10 text-sm",
            disabled && "bg-gray-100 cursor-not-allowed opacity-60",
            value ? "text-black font-semibold" : "text-gray-400",
            className,
          )}
        >
          <span>{formattedTime || placeholder}</span>
          <Clock className="w-4 h-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 flex gap-6 items-center shadow-2xl border-primary-100 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
        <Column
          items={HOURS}
          selected={hour}
          onSelect={handleHourChange}
          label="HOUR"
          disabled={disabled}
        />

        <div className="flex flex-col items-center pt-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-300 my-1 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary-300 my-1 animate-pulse" />
        </div>

        <Column
          items={MINUTES}
          selected={minute}
          onSelect={handleMinuteChange}
          label="MIN"
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TimeSpinner;
