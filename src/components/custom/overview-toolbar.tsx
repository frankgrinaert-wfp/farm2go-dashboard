import { Download, SquareArrowOutUpRight } from "lucide-react";
import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OverviewToolbarProps = {
  title: string;
  reportsUrl: string;
};

const ADMIN_AREAS = [
  { value: "all", label: "All admin areas" },
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "sylhet", label: "Sylhet" },
];

function OverviewToolbar({ title, reportsUrl }: OverviewToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger
            className="w-[11rem] border-border"
            aria-label="Admin area"
          >
            <SelectValue placeholder="All admin areas" />
          </SelectTrigger>
          <SelectContent>
            {ADMIN_AREAS.map((area) => (
              <SelectItem key={area.value} value={area.value}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TimeRangeTabs />
        <Button variant="outline" size="sm">
          <Download className="size-4" />
          Export
        </Button>
        <Button variant="link" asChild className="h-9 px-2">
          <a href={reportsUrl} target="_blank" rel="noopener noreferrer">
            Tableau
            <SquareArrowOutUpRight className="size-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export { OverviewToolbar };
