const TIME_RANGE_FILTERS = [
  { value: "one-day", label: "1 day" },
  { value: "seven-days", label: "7 days" },
  { value: "thirty-days", label: "30 days" },
  { value: "all-time", label: "All time" },
] as const;

type TimeRangeValue = (typeof TIME_RANGE_FILTERS)[number]["value"];

export { TIME_RANGE_FILTERS, type TimeRangeValue };
