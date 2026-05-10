import type { LucideIcon } from "lucide-react";
import { List, Package, UserPlus } from "lucide-react";

const METRIC_DETAIL_SLUGS = [
  "deposits-created",
  "farmer-registrations-created",
  "farmer-commodity-events-created",
] as const;

type MetricDetailSlug = (typeof METRIC_DETAIL_SLUGS)[number];

type Cell = string | string[];

type ColumnDef = {
  id: string;
  label: string;
  format: "text" | "link" | "comma-links" | "icon-only";
  icon?: LucideIcon;
};

type FilterDef = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

type MetricDetailPageConfig = {
  slug: MetricDetailSlug;
  title: string;
  summary: string;
  filters: FilterDef[];
  columns: ColumnDef[];
  rows: Record<string, Cell>[];
};

function metricDetailRoute(slug: MetricDetailSlug) {
  return `/overview/metrics/${slug}`;
}

function isMetricDetailSlug(slug: string): slug is MetricDetailSlug {
  return (METRIC_DETAIL_SLUGS as readonly string[]).includes(slug);
}

const FILTER_PLACEHOLDER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "one", label: "Example A" },
  { value: "two", label: "Example B" },
];

const dateCell = "28 Jul 2025";

function repeatRows<T>(factory: (i: number) => T, count = 10): T[] {
  return Array.from({ length: count }, (_, i) => factory(i));
}

const METRIC_DETAIL_PAGES: Record<MetricDetailSlug, MetricDetailPageConfig> = {
  "deposits-created": {
    slug: "deposits-created",
    title: "Deposits created",
    summary: "1000 Deposits, by 20 Farmers",
    filters: [
      {
        id: "aggregation-centre",
        label: "Aggregation Centre",
        options: FILTER_PLACEHOLDER_OPTIONS,
      },
      {
        id: "farmer",
        label: "Farmer",
        options: FILTER_PLACEHOLDER_OPTIONS,
      },
    ],
    columns: [
      { id: "depositIcon", label: "", format: "icon-only", icon: Package },
      { id: "deposit", label: "Deposit", format: "text" },
      {
        id: "depositedBy",
        label: "Deposited by",
        format: "link",
      },
      {
        id: "farmers",
        label: "Farmers",
        format: "comma-links",
      },
      { id: "date", label: "Date", format: "text" },
    ],
    rows: repeatRows(() => ({
      deposit: "Eggplant 130 kg (G2)",
      depositedBy: "Aggregation Centre Name",
      farmers: ["Farmer Name", "Farmer Name"],
      date: dateCell,
    })),
  },
  "farmer-registrations-created": {
    slug: "farmer-registrations-created",
    title: "Farmer registrations created",
    summary: "1000 Farmers, by 20 Aggregation Centres",
    filters: [
      {
        id: "aggregation-centre",
        label: "Aggregation Centre",
        options: FILTER_PLACEHOLDER_OPTIONS,
      },
    ],
    columns: [
      { id: "farmerIcon", label: "", format: "icon-only", icon: UserPlus },
      { id: "farmer", label: "Farmer", format: "text" },
      {
        id: "registeredBy",
        label: "Registered by",
        format: "link",
      },
      { id: "date", label: "Date", format: "text" },
    ],
    rows: repeatRows(() => ({
      farmer: "Farmer Name",
      registeredBy: "Aggregation Centre Name",
      date: dateCell,
    })),
  },
  "farmer-commodity-events-created": {
    slug: "farmer-commodity-events-created",
    title: "Farmer commodity events created",
    summary: "1000 Events, by 20 Aggregation Centres",
    filters: [
      {
        id: "farmer",
        label: "Farmer",
        options: FILTER_PLACEHOLDER_OPTIONS,
      },
    ],
    columns: [
      { id: "kind", label: "", format: "icon-only", icon: List },
      { id: "event", label: "Event", format: "link" },
      { id: "commodity", label: "Commodity", format: "link" },
      { id: "farmer", label: "Farmer", format: "link" },
      { id: "loggedBy", label: "Logged by", format: "link" },
      { id: "date", label: "Date", format: "text" },
    ],
    rows: repeatRows(() => ({
      event: "Event Name",
      commodity: "Commodity Name",
      farmer: "Farmer Name",
      loggedBy: "Aggregator Name",
      date: dateCell,
    })),
  },
};

function getMetricDetailConfig(
  slug: string,
): MetricDetailPageConfig | undefined {
  if (!isMetricDetailSlug(slug)) return undefined;
  return METRIC_DETAIL_PAGES[slug];
}

export {
  type MetricDetailSlug,
  type ColumnDef,
  metricDetailRoute,
  isMetricDetailSlug,
  getMetricDetailConfig,
};
