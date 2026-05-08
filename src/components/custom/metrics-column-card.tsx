import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

type MetricItem = {
  label: string;
  value: string;
  byline: string;
  icon: LucideIcon;
};

type MetricsColumnCardProps = {
  title: string;
  total: string;
  icon: LucideIcon;
  titleIconClassName: string;
  metrics: MetricItem[];
};

function MetricsColumnCard({
  title,
  total,
  icon: TitleIcon,
  titleIconClassName,
  metrics,
}: MetricsColumnCardProps) {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-0! border-b gap-0">
        <Item>
          <ItemMedia className={titleIconClassName}>
            <TitleIcon className="size-full" />
          </ItemMedia>
          <ItemContent>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm">{total}</CardDescription>
          </ItemContent>
        </Item>
      </CardHeader>
      <CardContent className="px-0">
        <ItemGroup>
          {metrics.map((metric, index) => (
            <div key={metric.label}>
              {index > 0 ? <ItemSeparator /> : null}
              <Item className="items-start px-5">
                <ItemMedia className="self-start">
                  <metric.icon className="size-5 text-neutral-600" />
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemDescription className="font-semibold">
                    {metric.label}
                  </ItemDescription>
                  <div className="flex items-baseline justify-between gap-4">
                    <ItemTitle className="text-lg font-semibold">
                      {metric.value}
                    </ItemTitle>
                    <ItemDescription className="text-xs">
                      {metric.byline}
                    </ItemDescription>
                  </div>
                </ItemContent>
              </Item>
            </div>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

export type { MetricItem };
export { MetricsColumnCard };
