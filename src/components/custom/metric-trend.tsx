import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

function MetricTrend({
  direction,
  value,
  className,
}: {
  direction: "up" | "down";
  value: string;
  className?: string;
}) {
  const isUp = direction === "up";
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs",
        isUp ? "text-success-700" : "text-warning-700",
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span>{value}</span>
    </span>
  );
}

export { MetricTrend };
