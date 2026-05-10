import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TIME_RANGE_FILTERS } from "@/constants/time-range";

function TimeRangeTabs() {
  return (
    <Tabs defaultValue="all-time">
      <TabsList>
        {TIME_RANGE_FILTERS.map((filter) => (
          <TabsTrigger key={filter.value} value={filter.value}>
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export { TimeRangeTabs };
