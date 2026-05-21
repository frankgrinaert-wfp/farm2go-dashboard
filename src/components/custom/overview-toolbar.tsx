import { TimeRangeTabs } from "@/components/custom/time-range-tabs";

type OverviewToolbarProps = {
  title: string;
};

function OverviewToolbar({ title }: OverviewToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <h1 className="font-bold text-3xl">{title}</h1>
      <TimeRangeTabs />
    </div>
  );
}

export { OverviewToolbar };
