import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EntityListStatCardConfig = {
  id: string;
  metric: string;
  /** Absolute count shown as the primary number (e.g. total aggregators). */
  number?: number;
  /** Percentage shown as the primary number (e.g. 62%). */
  percent?: number;
  /** Absolute count shown in the View link when `captionLink` is set. */
  count?: number;
  caption?: string;
  /** When true, shows “View {count}” beside the number (placeholder for future filters). */
  captionLink?: boolean;
  /** Change in the last 30 days (positive = up, negative = down). */
  trend30d: number;
  /** When true, an increase is bad (danger) and a decrease is good (success). */
  invertTrendColors?: boolean;
};

type EntityListStatCardProps = EntityListStatCardConfig;

function StatCardTrend({
  change,
  asPercent,
  invertTrendColors,
}: {
  change: number;
  asPercent?: boolean;
  invertTrendColors?: boolean;
}) {
  if (change === 0) return null;

  const isUp = change > 0;
  const Icon = isUp ? ArrowUp : ArrowDown;
  const valueLabel = `${change}${asPercent ? "%" : ""}`;
  const trendIsPositive = invertTrendColors ? !isUp : isUp;
  const trendColor = trendIsPositive
    ? "text-success-600"
    : "text-danger-600";

  return (
    <p
      className={cn("flex flex-wrap items-center gap-x-1 text-sm", trendColor)}
    >
      <span className="inline-flex items-center gap-0.5 tabular-nums">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        <span>{valueLabel}</span>
      </span>
      <span>in last 30 days</span>
    </p>
  );
}

function EntityListStatCard({
  number,
  percent,
  count,
  metric,
  caption,
  captionLink,
  trend30d,
  invertTrendColors,
}: EntityListStatCardProps) {
  const primaryValue =
    percent !== undefined ? `${percent}%` : (number?.toString() ?? "");

  return (
    <Card className="gap-0 py-4 shadow-xs">
      <CardContent className="flex flex-col gap-1.5 px-4">
        <p className="text-muted-foreground text-sm font-medium">{metric}</p>
        <div className="flex flex-wrap gap-1">
          <p className="font-semibold text-2xl text-foreground tabular-nums">
            {primaryValue}
          </p>
          {captionLink && count !== undefined ? (
            <Button
              variant="link"
              size="sm"
              onClick={(e) => e.preventDefault()}
              aria-label={`View ${count}`}
            >
              View {count}
            </Button>
          ) : null}
        </div>
        <StatCardTrend
          change={trend30d}
          asPercent={percent !== undefined}
          invertTrendColors={invertTrendColors}
        />
        {caption ? (
          <p className="text-muted-foreground text-sm">{caption}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function EntityListStatCardsRow({
  cards,
  className,
}: {
  cards: EntityListStatCardConfig[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {cards.map((card) => (
        <EntityListStatCard key={card.id} {...card} />
      ))}
    </div>
  );
}

export { EntityListStatCard, EntityListStatCardsRow };
