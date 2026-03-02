// import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import "../../styles/reactDatePicker.css";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getYear, getMonth } from "date-fns";
import moment from "moment";
import Label from "./Label";
import { cn } from "@/lib/utils";
import { convertMomentToDateFnsFormat } from "@/lib/date-helpers";
import { CalenderIcon } from "@/assets/icons/CalenderIcon";

interface IDateProps {
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  selected?: any;
  onChange?: any;
  onBlur?: any;
  hasError?: boolean;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  yearPicker?: boolean;
  className?: string;
  popperPlacement?: string;
  labelClassName?: string;
  size?: "sm" | "md";
  maxFutureYearForSelect?: number;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  timeCaption?: string;
  showIcon?: boolean;
  disabled?: boolean;
  icon?: any;
  datePickerClassName?: string;
  timeFormat?: "24h" | "12h";
  showMonthYearPicker?: boolean;
  minTime?: Date;
  maxTime?: Date;
}

const CustomHeader = (
  { date, changeYear, changeMonth }: any,
  maxFutureYearForSelect: number | undefined,
) => {
  const years = Array.from({ length: 100 }, (_, i) =>
    maxFutureYearForSelect
      ? maxFutureYearForSelect - i
      : getYear(new Date()) - i,
  );

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" }),
  );

  return (
    <div className="customDateHead">
      <div className="customDateLeft">
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="customDateRight">
        <select
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CustomDatePicker = React.forwardRef<HTMLDivElement, IDateProps>(
  function CustomDatePicker(
    {
      label,
      hasError,
      isRequired,
      placeholder,
      className,
      onBlur,
      onChange,
      popperPlacement,
      disabled,
      labelClassName,
      size = "md",
      maxFutureYearForSelect,
      minDate,
      maxDate,
      dateFormat,
      showTimeSelect = false,
      showTimeSelectOnly = false,
      timeIntervals = 15,
      timeCaption = "Time",
      showIcon = true,
      icon,
      datePickerClassName,
      selected,
      timeFormat = "24h",
      minTime,
      maxTime,
      ...rest
    },
    ref,
  ) {
    const effectiveMaxYear =
      maxFutureYearForSelect ?? moment().add(50, "years").year();

    const years = Array.from({ length: 100 }, (_, i) =>
      effectiveMaxYear ? effectiveMaxYear - i : getYear(new Date()) - i,
    );

    const latestYear = years[0];
    const dynamicMaxDate = new Date(latestYear, 11, 31);

    const resolvedTimeFormat = timeFormat === "24h" ? "HH:mm" : "hh:mm aa";

    const resolvedDateFormat = showTimeSelectOnly
      ? resolvedTimeFormat
      : dateFormat
        ? dateFormat
        : `${convertMomentToDateFnsFormat("YYYY-MM-DD")}${
            showTimeSelect ? `, ${resolvedTimeFormat}` : ""
          }`;

    const safeMinTime =
      minTime && maxTime && moment(minTime).isAfter(maxTime)
        ? undefined
        : minTime;
    const safeMaxTime =
      minTime && maxTime && moment(minTime).isAfter(maxTime)
        ? undefined
        : maxTime;

    const parsedSelected = React.useMemo(() => {
      if (!selected) return null;
      if (selected instanceof Date) return selected;
      if (typeof selected === "string") {
        const m = showTimeSelectOnly
          ? moment(selected, ["HH:mm", "hh:mm aa", "HH:mm:ss"])
          : moment(selected);
        return m.isValid() ? m.toDate() : null;
      }
      return null;
    }, [selected, showTimeSelectOnly]);

    return (
      <div className={cn("relative", className)} ref={ref}>
        <Label
          className={cn(
            "font-medium text-gray-700 mb-0.5",
            labelClassName,
            size === "sm" ? "text-xs" : "text-sm",
          )}
          isRequired={isRequired}
        >
          {label}
        </Label>

        <ErrorBoundary
          fallback={<p className="text-danger">Error in Datepicker</p>}
        >
          <ReactDatePicker
            disabled={disabled}
            selected={parsedSelected} // ✅ Robust parsing
            onChange={onChange}
            onBlur={onBlur}
            popperPlacement={
              popperPlacement ? (popperPlacement as any) : "bottom-start"
            }
            minDate={minDate}
            maxDate={maxDate ?? dynamicMaxDate}
            minTime={safeMinTime}
            maxTime={safeMaxTime}
            showIcon={showIcon}
            autoComplete="off"
            renderCustomHeader={
              !showTimeSelectOnly
                ? (e) => CustomHeader(e, effectiveMaxYear)
                : undefined
            }
            showTimeSelect={showTimeSelect || showTimeSelectOnly}
            showTimeSelectOnly={showTimeSelectOnly}
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            timeFormat={resolvedTimeFormat} // 👈 Added this to control dropdown format
            dateFormat={resolvedDateFormat}
            showMonthDropdown={!showTimeSelectOnly}
            showYearDropdown={!showTimeSelectOnly}
            adjustDateOnChange
            className={cn(
              datePickerClassName,
              hasError
                ? `!border focus:outline-none border-danger focus:ring-danger focus:ring-1 rounded-lg w-full text-sm ${size === "sm" ? "!min-h-9 h-9" : "h-10"}`
                : `!border border-gray-200 !outline-none focus:border-primary-500 focus:ring-primary-500 focus:ring-1 rounded-lg w-full text-sm text-gray-900 ${size === "sm" ? "!min-h-9 h-9" : "h-10"}`,
              disabled && "bg-gray-100 cursor-not-allowed",
            )}
            icon={icon ?? <CalenderIcon />}
            calendarIconClassname="cursor-pointer absolute top-1 end-1"
            placeholderText={
              placeholder
                ? placeholder
                : showTimeSelectOnly
                  ? "Select Time"
                  : "Select Date"
            }
            {...rest}
          />
        </ErrorBoundary>
      </div>
    );
  },
);

export default CustomDatePicker;
