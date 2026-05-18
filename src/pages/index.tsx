import { OverviewMetricsSection } from "@/components/custom/overview-metrics-section";
import { OverviewToolbar } from "@/components/custom/overview-toolbar";

function MainPage() {
  return (
    <>
      <main className="flex flex-col gap-8 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10">
        <OverviewToolbar
          title="Overview"
          reportsUrl="https://analytics.wfp.org/views/Farm2GoDashboard_17737548909260/HomePage"
        />
        <OverviewMetricsSection />
      </main>
    </>
  );
}

export { MainPage };
