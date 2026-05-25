import { format, isToday, isYesterday, parseISO } from "date-fns";

const FULL_DATE_TIME_FORMAT = "d MMM yyyy, H:mm";

function formatLastActiveAt(isoDate: string): string {
  const date = parseISO(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  if (isToday(date)) {
    return format(date, "'Today,' H:mm");
  }

  if (isYesterday(date)) {
    return format(date, "'Yesterday,' H:mm");
  }

  return format(date, FULL_DATE_TIME_FORMAT);
}

function parseLastActiveAt(isoDate: string): Date | null {
  const date = parseISO(isoDate);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysSinceLastActive(isoDate: string, now = new Date()): number | null {
  const date = parseLastActiveAt(isoDate);
  if (date === null) return null;
  const ms = now.getTime() - date.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function isLastActiveStale(
  lastActive: { at: string } | null,
  staleAfterDays = 30,
): boolean {
  if (lastActive === null) return false;
  const days = daysSinceLastActive(lastActive.at);
  return days !== null && days >= staleAfterDays;
}

export {
  formatLastActiveAt,
  isLastActiveStale,
  parseLastActiveAt,
  daysSinceLastActive,
};
