import type { LucideIcon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import type { MetricDetailSlug } from "@/config/metric-detail-config";
import { metricDetailRoute } from "@/config/metric-detail-config";
import {
  getEntityColorStyles,
  getEntityType,
  type EntityColor,
  type EntityTypeId,
} from "@/config/entity-types";
import { EntityTypeIcon } from "@/components/custom/entity-type-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
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
  detailSlug?: MetricDetailSlug;
  /** When true, the byline is not shown (value only). */
  hideByline?: boolean;
};

type MetricsColumnCardProps = {
  entityType: EntityTypeId;
  total: string;
  metrics: MetricItem[];
};

function MetricsColumnCard({
  entityType,
  total,
  metrics,
}: MetricsColumnCardProps) {
  const entity = getEntityType(entityType);
  const iconStyles = getEntityColorStyles(entity.color);

  return (
    <Card className="p-0 gap-0 border-none">
      <CardHeader className="p-0! border-b gap-0">
        <Item className="w-full items-center border-none">
          <ItemMedia>
            <EntityTypeIcon entityType={entityType} size="title" />
          </ItemMedia>
          <ItemContent className="min-w-0 flex-1 gap-0">
            <CardTitle className="text-lg">{entity.plural}</CardTitle>
            <CardDescription className="text-xs">{total}</CardDescription>
          </ItemContent>
          {entity.listPath ? (
            <ItemActions className="shrink-0">
              <Button variant="link" asChild>
                <RouterLink to={entity.listPath}>View all</RouterLink>
              </Button>
            </ItemActions>
          ) : null}
        </Item>
      </CardHeader>
      <CardContent className="px-0">
        <ItemGroup>
          {metrics.map((metric, index) => {
            const row = (
              <>
                <ItemMedia className="self-start">
                  <metric.icon className={`ml-1 size-5 ${iconStyles.metric}`} />
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemDescription className="font-semibold">
                    {metric.label}
                  </ItemDescription>
                  {metric.hideByline ? (
                    <ItemTitle className="text-base font-semibold">
                      {metric.value}
                    </ItemTitle>
                  ) : (
                    <div className="flex items-baseline justify-between gap-4">
                      <ItemTitle className="text-base font-semibold">
                        {metric.value}
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        {metric.byline}
                      </ItemDescription>
                    </div>
                  )}
                </ItemContent>
              </>
            );

            return (
              <div key={metric.label}>
                {index > 0 ? <ItemSeparator /> : null}
                {metric.detailSlug ? (
                  <Item asChild className="items-start border-none">
                    <RouterLink to={metricDetailRoute(metric.detailSlug)}>
                      {row}
                    </RouterLink>
                  </Item>
                ) : (
                  <Item className="items-start border-none">{row}</Item>
                )}
              </div>
            );
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

export type { EntityColor, MetricItem };
export { MetricsColumnCard };
