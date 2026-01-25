import {
  SchedulingListResponse,
  TransformedSchedulingResponse,
  TransformedSchedulingRota,
} from "@/models/scheduling";

const generateDateRange = (start: string, end: string): string[] => {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const transformSchedulingResponse = (
  response: SchedulingListResponse,
): TransformedSchedulingResponse => {
  const { data } = response;

  // Detect range automatically (month or week)
  const range =
    "month" in data ? data.month : "week" in data ? data.week : null;

  if (!range) {
    throw new Error("No valid date range found (month/week)");
  }

  const allDates = generateDateRange(range.start_date, range.end_date);
  console.log("allDates: ", allDates);

  const transformedRotas: TransformedSchedulingRota[] = data.rotas.map(
    (employeeRota) => {
      const rotaMap = new Map(employeeRota.rotas.map((r) => [r.date, r]));

      return {
        ...employeeRota,
        rotas: allDates.map((date) => ({
          date,
          rota: rotaMap.get(date) ?? null,
        })),
      };
    },
  );

  return {
    ...response,
    data: {
      ...data,
      rotas: transformedRotas,
    },
  };
};

export const formatScheduleDate = (
  dateString?: string | null,
): string | null => {
  if (!dateString) return null;

  const date = new Date(dateString);

  // invalid date check
  if (Number.isNaN(date.getTime())) return null;

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return `${formattedDate} (${day})`;
};

export const formatRotaModalDate = (
  dateString?: string | null,
): string | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();

  return `${weekday} ${month} ${day}`;
};
