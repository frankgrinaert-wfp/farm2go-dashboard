import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EntityListStatCardConfig = {
  id: string;
  metric: string;
  /** Primary count shown on the card. */
  number?: number;
  caption?: string;
  /** When true, shows a “View” link beside the number (placeholder for future filters). */
  captionLink?: boolean;
  /** Percentage-point change in the last 30 days (positive = up, negative = down). */
  trend30d: number;
  /** When true, an increase is bad (danger) and a decrease is good (success). */
  invertTrendColors?: boolean;
};

type EntityListStatCardProps = EntityListStatCardConfig;

function StatCardTrend({
  change,
  invertTrendColors,
}: {
  change: number;
  invertTrendColors?: boolean;
}) {
  if (change === 0) return null;

  const isUp = change > 0;
  const Icon = isUp ? ArrowUp : ArrowDown;
  const valueLabel = `${change}%`;
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
  metric,
  caption,
  captionLink,
  trend30d,
  invertTrendColors,
}: EntityListStatCardProps) {
  const primaryValue = number?.toString() ?? "";

  return (
    <Card className="gap-0 py-4 shadow-xs">
      <CardContent className="flex flex-col gap-1.5 px-4">
        <p className="text-muted-foreground text-sm font-medium">{metric}</p>
        <div className="flex flex-wrap gap-1">
          <p className="font-semibold text-2xl text-foreground tabular-nums">
            {primaryValue}
          </p>
          {captionLink ? (
            <Button
              variant="link"
              size="sm"
              onClick={(e) => e.preventDefault()}
              aria-label={`View ${metric.toLowerCase()}`}
            >
              View
            </Button>
          ) : null}
        </div>
        <StatCardTrend
          change={trend30d}
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
