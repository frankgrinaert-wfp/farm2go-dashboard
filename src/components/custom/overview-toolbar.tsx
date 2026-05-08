import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FILTERS = [
  { value: "one-day", label: "1 day" },
  { value: "seven-days", label: "7 days" },
  { value: "thirty-days", label: "30 days" },
  { value: "all-time", label: "All time" },
] as const;

type OverviewToolbarProps = {
  title: string;
  reportsUrl: string;
};

function OverviewToolbar({ title, reportsUrl }: OverviewToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex items-start gap-3 md:items-end">
        <Button variant="link" asChild>
          <a href={reportsUrl} target="_blank" rel="noopener noreferrer">
            Detailed reports in Tableau
            <SquareArrowOutUpRight />
          </a>
        </Button>
        <Tabs defaultValue="all-time">
          <TabsList>
            {FILTERS.map((filter) => (
              <TabsTrigger key={filter.value} value={filter.value}>
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export { OverviewToolbar };
