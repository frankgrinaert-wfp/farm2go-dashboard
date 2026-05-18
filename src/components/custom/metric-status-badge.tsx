import { Badge } from "@/components/ui/badge";
import type { MetricStatus } from "@/data/overview-dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<MetricStatus, string> = {
  healthy: "Healthy",
  "needs-attention": "Needs attention",
  "no-activity": "No recent activity",
  improving: "Improving",
  declining: "Declining",
};

const STATUS_VARIANTS: Record<
  MetricStatus,
  "success" | "warning" | "destructive" | "secondary"
> = {
  healthy: "success",
  "needs-attention": "warning",
  "no-activity": "destructive",
  improving: "success",
  declining: "warning",
};

function MetricStatusBadge({
  status,
  className,
}: {
  status: MetricStatus;
  className?: string;
}) {
  return (
    <Badge
      variant={STATUS_VARIANTS[status]}
      className={cn("font-normal", className)}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}

export { MetricStatusBadge };
