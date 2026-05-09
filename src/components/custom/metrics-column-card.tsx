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

type CategoryColor =
  | "purple"
  | "red"
  | "orange"
  | "brown"
  | "ivory"
  | "green"
  | "aqua"
  | "blue"
  | "neutral";

type MetricsColumnCardProps = {
  title: string;
  total: string;
  icon: LucideIcon;
  categoryColor: CategoryColor;
  metrics: MetricItem[];
};

const TITLE_ICON_BASE_CLASSNAME = "size-10 rounded-lg p-2";

const CATEGORY_ICON_STYLES = {
  purple: {
    title: "text-purple-600 bg-purple-100",
    metric: "text-purple-500",
  },
  red: {
    title: "text-red-600 bg-red-100",
    metric: "text-red-500",
  },
  orange: {
    title: "text-orange-600 bg-orange-100",
    metric: "text-orange-500",
  },
  brown: {
    title: "text-brown-700 bg-brown-100",
    metric: "text-brown-600",
  },
  ivory: {
    title: "text-ivory-700 bg-ivory-100",
    metric: "text-ivory-600",
  },
  green: {
    title: "text-green-600 bg-green-100",
    metric: "text-green-500",
  },
  aqua: {
    title: "text-aqua-600 bg-aqua-100",
    metric: "text-aqua-500",
  },
  blue: {
    title: "text-blue-600 bg-blue-100",
    metric: "text-blue-500",
  },
  neutral: {
    title: "text-neutral-600 bg-neutral-100",
    metric: "text-neutral-500",
  },
} as const;

function MetricsColumnCard({
  title,
  total,
  icon: TitleIcon,
  categoryColor,
  metrics,
}: MetricsColumnCardProps) {
  const iconStyles = CATEGORY_ICON_STYLES[categoryColor];

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-0! border-b gap-0">
        <Item className="border-none">
          <ItemMedia
            className={`${TITLE_ICON_BASE_CLASSNAME} ${iconStyles.title}`}
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
              <Item className="items-start border-none">
                <ItemMedia className="self-start">
                  <metric.icon className={`size-5 ml-1 ${iconStyles.metric}`} />
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

export type { CategoryColor, MetricItem };
export { MetricsColumnCard };
