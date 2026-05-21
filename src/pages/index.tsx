import { OverviewMetricsSection } from "@/components/custom/overview-metrics-section";
import { OverviewToolbar } from "@/components/custom/overview-toolbar";

function MainPage() {
  return (
    <>
      <main className="flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10">
        <OverviewToolbar title="Overview" />
        <OverviewMetricsSection />
      </main>
    </>
  );
}

export { MainPage };
