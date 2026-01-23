export const isToday = (dateString: string): boolean => {
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
