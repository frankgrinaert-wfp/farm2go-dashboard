import { MetricStatusBadge } from "@/components/custom/metric-status-badge";
import { MetricTrend } from "@/components/custom/metric-trend";
import { Card, CardContent } from "@/components/ui/card";
import type { SnapshotMetric } from "@/data/overview-dashboard-data";
import {
  COUNTRY_OVERVIEW_LABEL,
  SNAPSHOT_METRICS,
} from "@/data/overview-dashboard-data";

function SnapshotKpiCard({ metric }: { metric: SnapshotMetric }) {
  const isZero =
    metric.value === "0" ||
    metric.value === "$0" ||
    metric.value === "0%";

  return (
    <Card className="gap-3 border py-4 shadow-sm">
      <CardContent className="flex flex-col gap-2 px-4">
        <p className="text-muted-foreground text-xs leading-snug">
          {metric.label}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="font-semibold text-2xl tracking-tight">{metric.value}</p>
          {metric.percentage ? (
            <span className="text-muted-foreground text-sm">
              {metric.percentage}
            </span>
          ) : null}
        </div>
        {metric.context ? (
          <p className="text-muted-foreground text-xs">{metric.context}</p>
        ) : null}
        {metric.status ? (
          <MetricStatusBadge status={metric.status} />
        ) : null}
        {metric.trend ? (
          <MetricTrend
            direction={metric.trend.direction}
            value={metric.trend.value}
          />
        ) : null}
        {isZero && metric.emptyGuidance ? (
          <p className="rounded-md bg-muted/60 p-2 text-muted-foreground text-xs leading-relaxed">
            {metric.emptyGuidance}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function AdoptionSnapshot() {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Adoption snapshot</h2>
        <p className="text-muted-foreground text-sm">
          {COUNTRY_OVERVIEW_LABEL} — Reach → Usage → Market linkage → Result
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SNAPSHOT_METRICS.map((metric) => (
          <SnapshotKpiCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}

export { AdoptionSnapshot };
