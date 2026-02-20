import { ScheduleFrequency } from "@/models/Requests/schedule";

export const isToday = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Get short weekday name, e.g., "Mon", "Tue"
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

  // Get date number
  const dayNumber = date.getDate();

  return `${dayName} ${dayNumber}`;
};
// utils/date.ts

export const hasDatePassed = (dateString: string | null): boolean => {
  if (!dateString) return false;
  const inputDate = new Date(dateString);
  const today = new Date();

  // Ignore time by resetting hours, minutes, seconds, ms
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};

const momentToDateFnsFormatMap = {
  YYYY: "yyyy",
  YY: "yy",
  M: "M",
  MM: "MM",
  MMM: "MMM",
  MMMM: "MMMM",
  D: "d",
  DD: "dd",
  ddd: "eee",
  dddd: "eeee",
  H: "H",
  HH: "HH",
  h: "h",
  hh: "hh",
  m: "m",
  mm: "mm",
  s: "s",
  ss: "ss",
  A: "a",
  a: "a",
  Do: "do",
  Z: "XXX",
  ZZ: "xx",
};

export function convertMomentToDateFnsFormat(momentFormat: string) {
  let dateFnsFormat = momentFormat;
  for (const [momentToken, dateFnsToken] of Object.entries(
    momentToDateFnsFormatMap,
  )) {
    const regex = new RegExp(momentToken, "g");
    dateFnsFormat = dateFnsFormat?.replace(regex, dateFnsToken);
  }
  return dateFnsFormat;
}

export const convertTo24Hour = (time: string | null): string | null => {
  if (!time) return null;

  const [timePart, modifier] = time.split(" "); // "06:00", "PM"
  const [hours, minutes] = timePart.split(":");

  let hourNumber = parseInt(hours, 10);

  if (modifier === "PM" && hourNumber !== 12) {
    hourNumber += 12;
  }

  if (modifier === "AM" && hourNumber === 12) {
    hourNumber = 0;
  }

  return `${hourNumber.toString().padStart(2, "0")}:${minutes}`;
};

export const shiftDate = ({
  amount,
  dateString,
  unit,
}: {
  dateString: string;
  amount: number;
  unit: ScheduleFrequency;
}): string => {
  const date = new Date(dateString);

  if (unit === "monthly") {
    date.setMonth(date.getMonth() + amount);
  }

  if (unit === "weekly") {
    date.setDate(date.getDate() + amount * 7);
  }

  return date.toISOString().split("T")[0];
};

export const createDateRange = ({
  start,
  end,
}: {
  start: string;
  end: string;
}): string[] => {
  const result: string[] = [];

  const current = new Date(start);
  const endDate = new Date(end);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    result.push(`${year}-${month}-${day}`);

    current.setDate(current.getDate() + 1);
  }

  return result;
};

export const getTodayFormatted = (): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTimeRange = ({
  start,
  end,
  format = "24h",
}: {
  start: string;
  end: string;
  format?: "24h" | "12h"; // optional, default = 24h
}): string => {
  const formatSingleTime = (time: string): string => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = Number(hourStr);
    const minute = minuteStr.padStart(2, "0");

    if (format === "24h") {
      return `${hourStr.padStart(2, "0")}:${minute}`;
    }

    const period = hour >= 12 ? "PM" : "AM";
    const convertedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${String(convertedHour).padStart(2, "0")}:${minute} ${period}`;
  };

  return `${formatSingleTime(start)} - ${formatSingleTime(end)}`;
};
