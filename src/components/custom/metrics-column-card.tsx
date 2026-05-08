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
  titleIconColorClassName: string;
  metrics: MetricItem[];
};

const TITLE_ICON_BASE_CLASSNAME = "size-10 rounded-lg p-2";

function MetricsColumnCard({
  title,
  total,
  icon: TitleIcon,
  titleIconColorClassName,
  metrics,
}: MetricsColumnCardProps) {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-0! border-b gap-0">
        <Item>
          <ItemMedia
            className={`${TITLE_ICON_BASE_CLASSNAME} ${titleIconColorClassName}`}
          >
            <TitleIcon className="size-full" />
          </ItemMedia>
          <ItemContent className="gap-0">
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
              <Item className="items-start px-5">
                <ItemMedia className="self-start">
                  <metric.icon className="size-5 text-neutral-600" />
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemDescription className="font-semibold">
                    {metric.label}
                  </ItemDescription>
                  <div className="flex items-baseline justify-between gap-4">
                    <ItemTitle className="text-base font-semibold">
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
