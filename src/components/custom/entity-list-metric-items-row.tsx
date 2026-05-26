import type { LucideIcon } from "lucide-react";
import { METRIC_ICONS, type MetricIconId } from "@/config/entity-types";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";

export type EntityListMetricItem = {
  id: string;
  iconId: MetricIconId;
  label: string;
  value: number;
};

function MetricIcon({ iconId }: { iconId: MetricIconId }) {
  const Icon: LucideIcon = METRIC_ICONS[iconId];

  return <Icon className="size-5 text-neutral-600" aria-hidden />;
}

function EntityListMetricItemsRow({
  items,
  className,
}: {
  items: EntityListMetricItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <Item
          key={item.id}
          variant="outline"
          size="sm"
          className="h-full justify-start rounded-xl py-4 shadow-xs"
        >
          <ItemMedia>
            <MetricIcon iconId={item.iconId} />
          </ItemMedia>
          <ItemContent className="justify-center">
            <ItemTitle className="whitespace-nowrap font-normal">
              <span className="font-medium tabular-nums">{item.value}</span>{" "}
              {item.label}
            </ItemTitle>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}

export { EntityListMetricItemsRow };
