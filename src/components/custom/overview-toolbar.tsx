import { SquareArrowOutUpRight } from "lucide-react";
import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";

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
        <TimeRangeTabs />
      </div>
    </div>
  );
}

export { OverviewToolbar };
