const TIME_RANGE_FILTERS = [
  { value: "one-day", label: "1 day" },
  { value: "seven-days", label: "7 days" },
  { value: "thirty-days", label: "30 days" },
  { value: "all-time", label: "All time" },
] as const;

const DEFAULT_TIME_RANGE = "all-time" satisfies TimeRangeValue;

type TimeRangeValue = (typeof TIME_RANGE_FILTERS)[number]["value"];

export { TIME_RANGE_FILTERS, DEFAULT_TIME_RANGE, type TimeRangeValue };
