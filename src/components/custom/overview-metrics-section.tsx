import { MetricsColumnCard } from "@/components/custom/metrics-column-card";
import { AdoptionFunnel } from "@/components/custom/adoption-funnel";
import { AdoptionSnapshot } from "@/components/custom/adoption-snapshot";
import { NeedsAttentionPanel } from "@/components/custom/needs-attention-panel";
import { ROLE_CARDS } from "@/data/overview-dashboard-data";

function OverviewMetricsSection() {
  return (
    <div className="flex flex-col gap-10">
      <AdoptionSnapshot />

      <div className="grid gap-6 lg:grid-cols-[1fr_min(22rem,100%)]">
        <AdoptionFunnel />
        <NeedsAttentionPanel />
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-lg">Role summaries</h2>
          <p className="text-muted-foreground text-sm">
            Diagnostic view by Farmers Reached, Aggregators, and Buyers
          </p>
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {ROLE_CARDS.map((card) => (
            <MetricsColumnCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
              categoryColor={card.categoryColor}
              defaultMetrics={card.defaultMetrics}
              expandedMetrics={card.expandedMetrics}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export { OverviewMetricsSection };
