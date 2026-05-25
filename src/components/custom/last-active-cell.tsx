import type { LastActive } from "@/config/last-active";
import { formatLastActiveAt, isLastActiveStale } from "@/lib/format-last-active-at";
import { cn } from "@/lib/utils";

function LastActiveCell({ lastActive }: { lastActive: LastActive }) {
  if (lastActive === null) {
    return <span className="text-muted-foreground">—</span>;
  }

  const stale = isLastActiveStale(lastActive);
  const timeLabel = formatLastActiveAt(lastActive.at);

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span
        className={cn(
          "text-sm tabular-nums",
          stale ? "text-warning-600" : "text-foreground",
        )}
      >
        {timeLabel}
      </span>
      <span className="text-muted-foreground text-xs leading-snug">
        {lastActive.activity}
      </span>
    </div>
  );
}

export { LastActiveCell };
