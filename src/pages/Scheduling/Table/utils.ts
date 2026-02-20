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
