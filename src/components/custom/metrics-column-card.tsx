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
    <Card className="p-0">
      <CardHeader className="p-0">
        <Item>
          <ItemMedia className={titleIconClassName}>
            <TitleIcon className="size-full" />
          </ItemMedia>
          <ItemContent>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-xs">{total}</CardDescription>
          </ItemContent>
        </Item>
      </CardHeader>
      <CardContent className="px-0">
        <ItemGroup>
          {metrics.map((metric, index) => (
            <div key={metric.label}>
              {index > 0 ? <ItemSeparator /> : null}
              <Item className="px-5">
                <ItemMedia>
                  <metric.icon className="size-5 text-neutral-600" />
                </ItemMedia>
                <ItemContent>
                  <ItemDescription className="font-semibold">
                    {metric.label}
                  </ItemDescription>
                  <ItemTitle className="text-lg font-semibold">
                    {metric.value}
                  </ItemTitle>
                </ItemContent>
                <ItemDescription className="text-xs">
                  {metric.byline}
                </ItemDescription>
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
