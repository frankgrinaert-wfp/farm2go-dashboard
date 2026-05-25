import { set, subDays, subHours, subMonths } from "date-fns";

/** ISO timestamps anchored to load time so demo rows stay “recent”. */
const MOCK_NOW = new Date();

function at(date: Date): string {
  return date.toISOString();
}

export const mockLastActiveAt = {
  hoursAgo: (hours: number) => at(subHours(MOCK_NOW, hours)),
  daysAgo: (days: number, time?: { hours: number; minutes: number }) =>
    at(
      time
        ? set(subDays(MOCK_NOW, days), {
            hours: time.hours,
            minutes: time.minutes,
            seconds: 0,
            milliseconds: 0,
          })
        : subDays(MOCK_NOW, days),
    ),
  todayAt: (hours: number, minutes: number) =>
    at(
      set(MOCK_NOW, {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      }),
    ),
  monthsAgo: (months: number) => at(subMonths(MOCK_NOW, months)),
  staleDaysAgo: (days: number) => at(subDays(MOCK_NOW, days)),
} as const;
