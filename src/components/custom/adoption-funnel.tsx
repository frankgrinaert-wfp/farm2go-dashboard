import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FUNNEL_STEPS } from "@/data/overview-dashboard-data";
import { cn } from "@/lib/utils";

function funnelDropRate(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return Math.round((current / previous) * 100);
}

function AdoptionFunnel() {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-lg">Adoption funnel</h2>
        <p className="text-muted-foreground text-sm">
          Where users drop off from onboarding to payment
        </p>
      </div>
      <Card className="overflow-x-auto border py-4 shadow-sm">
        <CardContent className="px-4">
          <ol className="flex min-w-max items-stretch gap-0">
            {FUNNEL_STEPS.map((step, index) => {
              const prev = index > 0 ? FUNNEL_STEPS[index - 1] : null;
              const conversion =
                prev != null ? funnelDropRate(step.value, prev.value) : null;

              return (
                <li key={step.label} className="flex items-stretch">
                  {index > 0 ? (
                    <div className="flex flex-col items-center justify-center px-1 sm:px-2">
                      <ChevronRight
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden
                      />
                      {conversion != null ? (
                        <span
                          className={cn(
                            "mt-0.5 whitespace-nowrap text-[10px] tabular-nums",
                            conversion < 30
                              ? "text-danger-600"
                              : conversion < 60
                                ? "text-warning-700"
                                : "text-muted-foreground",
                          )}
                        >
                          {conversion}%
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div
                    className={cn(
                      "flex min-w-[5.5rem] flex-col rounded-lg border bg-muted/30 px-3 py-2.5 sm:min-w-[6.5rem]",
                      index === 0 && "border-primary/30 bg-primary/5",
                    )}
                  >
                    <span className="font-semibold text-lg tabular-nums leading-tight">
                      {step.formattedValue}
                    </span>
                    <span className="mt-1 text-[11px] text-muted-foreground leading-snug">
                      {step.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}

export { AdoptionFunnel };
