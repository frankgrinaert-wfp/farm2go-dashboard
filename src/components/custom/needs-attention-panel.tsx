import { AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ATTENTION_ITEMS } from "@/data/overview-dashboard-data";

function NeedsAttentionPanel() {
  return (
    <Card className="border-warning-200 bg-warning-50/40 py-4 shadow-sm">
      <CardHeader className="px-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="size-4 text-warning-700" aria-hidden />
          Needs attention
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <ul className="flex flex-col">
          {ATTENTION_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-warning-100/80"
              >
                <span className="flex min-w-0 items-baseline gap-2">
                  <span className="shrink-0 font-semibold tabular-nums text-warning-800">
                    {item.count}
                  </span>
                  <span className="text-foreground leading-snug">
                    {item.label}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export { NeedsAttentionPanel };
