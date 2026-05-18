import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { MetricStatusBadge } from "@/components/custom/metric-status-badge";
import { MetricTrend } from "@/components/custom/metric-trend";
import type { MetricDetailSlug } from "@/config/metric-detail-config";
import { metricDetailRoute } from "@/config/metric-detail-config";
import type { MetricStatus } from "@/data/overview-dashboard-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type MetricItem = {
  label: string;
  value: string;
  byline: string;
  icon: LucideIcon;
  detailSlug?: MetricDetailSlug;
  hideByline?: boolean;
  percentage?: string;
  status?: MetricStatus;
  trend?: { direction: "up" | "down"; value: string };
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
  subtitle: string;
  icon: LucideIcon;
  categoryColor: CategoryColor;
  defaultMetrics: MetricItem[];
  expandedMetrics?: MetricItem[];
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

function MetricRow({
  metric,
  iconStyles,
}: {
  metric: MetricItem;
  iconStyles: (typeof CATEGORY_ICON_STYLES)[CategoryColor];
}) {
  const row = (
    <>
      <ItemMedia className="self-start">
        <metric.icon className={`ml-1 size-5 ${iconStyles.metric}`} />
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemDescription className="font-semibold">{metric.label}</ItemDescription>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <ItemTitle className="text-base font-semibold">{metric.value}</ItemTitle>
          {metric.percentage && !metric.hideByline ? (
            <span className="text-muted-foreground text-xs tabular-nums">
              {metric.percentage}
            </span>
          ) : null}
        </div>
        {!metric.hideByline && metric.byline ? (
          <ItemDescription className="text-xs">{metric.byline}</ItemDescription>
        ) : null}
        {metric.status ? <MetricStatusBadge status={metric.status} /> : null}
        {metric.trend ? (
          <MetricTrend
            direction={metric.trend.direction}
            value={metric.trend.value}
          />
        ) : null}
      </ItemContent>
    </>
  );

  if (metric.detailSlug) {
    return (
      <Item asChild className="items-start border-none">
        <Link to={metricDetailRoute(metric.detailSlug)}>{row}</Link>
      </Item>
    );
  }

  return <Item className="items-start border-none">{row}</Item>;
}

function MetricsColumnCard({
  title,
  subtitle,
  icon: TitleIcon,
  categoryColor,
  defaultMetrics,
  expandedMetrics = [],
}: MetricsColumnCardProps) {
  const [open, setOpen] = useState(false);
  const iconStyles = CATEGORY_ICON_STYLES[categoryColor];
  const hasExpanded = expandedMetrics.length > 0;

  return (
    <Card className="gap-0 border p-0 shadow-sm">
      <CardHeader className="border-b px-4 py-3">
        <Item className="border-none p-0">
          <ItemMedia
            className={`${TITLE_ICON_BASE_CLASSNAME} ${iconStyles.title}`}
          >
            <TitleIcon className="size-full" />
          </ItemMedia>
          <ItemContent className="gap-0">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{subtitle}</CardDescription>
          </ItemContent>
        </Item>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <ItemGroup>
          {defaultMetrics.map((metric, index) => (
            <div key={metric.label}>
              {index > 0 ? <ItemSeparator /> : null}
              <MetricRow metric={metric} iconStyles={iconStyles} />
            </div>
          ))}
        </ItemGroup>

        {hasExpanded ? (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleContent>
              <ItemGroup className="border-t">
                {expandedMetrics.map((metric, index) => (
                  <div key={metric.label}>
                    {index > 0 || defaultMetrics.length > 0 ? (
                      <ItemSeparator />
                    ) : null}
                    <MetricRow metric={metric} iconStyles={iconStyles} />
                  </div>
                ))}
              </ItemGroup>
            </CollapsibleContent>
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center justify-center gap-1.5 border-t px-4 py-2.5 text-muted-foreground text-xs transition-colors hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <span>{open ? "Show less" : "View details"}</span>
              <ChevronDown
                className={cn("size-3.5 transition-transform", open && "rotate-180")}
                aria-hidden
              />
            </CollapsibleTrigger>
          </Collapsible>
        ) : null}
      </CardContent>
    </Card>
  );
}

export type { CategoryColor, MetricItem };
export { MetricsColumnCard };
