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
  showIcon?: boolean;
  disabled?: boolean;
  icon?: any;
  datePickerClassName?: string;
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
  console.log("years: ", { years, months });

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
      errorMessage,
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
      showIcon = true,
      icon,
      datePickerClassName,
      selected,
      ...rest
    },
    ref,
  ) {
    // If maxDate is provided as a prop, set maxFutureYearForSelect to the year of maxDate
    const effectiveMaxYear =
      maxFutureYearForSelect ?? moment().add(50, "years").year();

    // Determine the maxDate dynamically based on the year dropdown selection
    const years = Array.from({ length: 100 }, (_, i) =>
      effectiveMaxYear ? effectiveMaxYear - i : getYear(new Date()) - i,
    );
    const latestYear = years[0]; // The most recent year from the dropdown

    // Set maxDate as the latest year in the dropdown, December 31st
    const dynamicMaxDate = new Date(latestYear, 11, 31);

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
            popperPlacement={
              popperPlacement ? (popperPlacement as any) : "bottom-start"
            }
            onChange={onChange}
            onBlur={onBlur}
            onFocus={() => {}}
            minDate={minDate}
            maxDate={maxDate ?? dynamicMaxDate} // Use dynamic maxDate here
            showIcon={showIcon}
            autoComplete={"off"}
            renderCustomHeader={(e) => CustomHeader(e, effectiveMaxYear)}
            showTimeSelect={showTimeSelect}
            dateFormat={
              !dateFormat
                ? `${convertMomentToDateFnsFormat("")}${!showTimeSelect ? "" : ", hh:mm a"}`
                : dateFormat
            }
            showMonthDropdown
            value={selected}
            showYearDropdown
            adjustDateOnChange
            className={cn(
              datePickerClassName,
              hasError
                ? `!border  focus:outline-none border-danger focus:ring-danger focus:ring-1 rounded-lg w-full text-sm ${size === "sm" ? "!min-h-9 h-9" : "h-10"}`
                : `!border border-gray-200 !outline-none focus:border-primary-500 focus:ring-primary-500 focus:ring-1 rounded-lg w-full text-sm text-gray-900 ${size === "sm" ? "!min-h-9 h-9" : "h-10"}`,
              disabled && "cursor-not-allowed",
            )}
            icon={icon ?? <CalenderIcon />}
            calendarIconClassname="cursor-pointer absolute top-1 end-1"
            placeholderText={placeholder ? placeholder : "Select Date"}
            {...rest}
          />
        </ErrorBoundary>
        {hasError && errorMessage && (
          <p className="px-1 -mt-1 text-xs ltr:text-left rtl:text-right text-danger">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
export default CustomDatePicker;
