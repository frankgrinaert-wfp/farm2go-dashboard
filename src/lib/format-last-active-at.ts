import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

/** Within this window, show relative distance (e.g. "2 hours ago"). */
const RECENT_HOURS_THRESHOLD = 6;

function formatLastActiveAt(isoDate: string, now = new Date()): string {
  const date = parseISO(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const hoursAgo = differenceInHours(now, date);
  if (hoursAgo >= 0 && hoursAgo < RECENT_HOURS_THRESHOLD) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return format(date, "'Yesterday,' HH:mm");
  }

  const daysAgo = differenceInDays(now, date);
  if (daysAgo >= 2 && daysAgo < 30) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  const monthsAgo = differenceInMonths(now, date);
  if (monthsAgo >= 1) {
    return monthsAgo === 1 ? "Last month" : format(date, "MMM yyyy");
  }

  return format(date, "d MMM");
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
