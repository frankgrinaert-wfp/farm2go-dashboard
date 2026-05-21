import type { ReactNode } from "react";
import {
  Archive,
  ChevronRight,
  MessageCircle,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { getEntityType, type EntityTypeId } from "@/config/entity-types";

/** Tweak layout, spacing, and shared table chrome in one place. */
export const ENTITY_LIST_PRESENTATION = {
  main: "flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10",
  pageHeader:
    "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  title: "font-bold text-3xl",
  headerActions: "flex flex-wrap items-center gap-2",
  toolbar: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  toolbarStart: "flex flex-wrap items-center gap-2",
  searchWrapper: "relative min-w-[12rem] flex-1 max-w-xs",
  searchInput: "pl-9",
  tableIconColumnClassName: "w-px",
  actionsColumnClassName: "w-px text-right",
  rowActionsClassName: "flex items-center justify-end gap-1",
} as const;

export type ActivityStatus =
  | "Active"
  | "Low activity"
  | "Inactive"
  | "Archived"
  | "No recent activity";

export const ACTIVITY_STATUS_BADGE_VARIANT: Record<
  ActivityStatus,
  "success" | "warning" | "destructive" | "secondary"
> = {
  Active: "success",
  "Low activity": "warning",
  Inactive: "destructive",
  Archived: "secondary",
  "No recent activity": "warning",
};

export type MetricTone = "default" | "warning" | "danger";

export function getMetricTone(value: number): MetricTone {
  if (value === 0) return "danger";
  if (value < 10) return "warning";
  return "default";
}

export const METRIC_TONE_CLASS: Record<MetricTone, string> = {
  default: "text-foreground",
  warning: "text-warning-600",
  danger: "text-danger-600",
};

function ActivityStatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <Badge variant={ACTIVITY_STATUS_BADGE_VARIANT[status]}>{status}</Badge>
  );
}

function MetricValue({ value, tone }: { value: number; tone?: MetricTone }) {
  const resolved = tone ?? getMetricTone(value);
  return (
    <span className={`tabular-nums ${METRIC_TONE_CLASS[resolved]}`}>
      {value}
    </span>
  );
}

function PlaceholderEntityLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href="#" className={className} onClick={(e) => e.preventDefault()}>
      {children}
    </Link>
  );
}

export type EntityListColumn<TRow> = {
  id: string;
  header?: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: TRow) => ReactNode;
};

export type EntityListPageHeaderConfig = {
  showAdd?: boolean;
};

export type EntityListPageConfig<TRow extends { id: string }> = {
  entityType: EntityTypeId;
  rows: TRow[];
  columns: EntityListColumn<TRow>[];
  header?: EntityListPageHeaderConfig;
  renderRowActions?: (row: TRow) => ReactNode;
};

// --- Row types & mock data ---

export type FarmerRow = {
  id: string;
  name: string;
  region: string;
  commodities: string[];
  aggregationCentre: string;
  dateRegistered: string;
  lastDeposit: string;
  activity: ActivityStatus;
};

const FARMER_ROWS: FarmerRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: "Alex Jannetta",
  region: "Dakkin Methachari",
  commodities: ["Ash Gourd", "Banana inflorescence"],
  aggregationCentre: "Kutupalong Agricultural Centre",
  dateRegistered: "28 Jul 2025",
  lastDeposit: "Yesterday",
  activity: "Active" as const,
}));

export type AggregatorRow = {
  id: string;
  name: string;
  area: string;
  farmers: number;
  deposits: number;
  offersAccepted: number;
  exchanges: number;
  activity: ActivityStatus;
};

const AGGREGATOR_ROW_TEMPLATES: Omit<AggregatorRow, "id">[] = [
  {
    name: "Kutupalong Agricultural Production Cooperative",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 87,
    deposits: 42,
    offersAccepted: 18,
    exchanges: 12,
    activity: "Active",
  },
  {
    name: "Balukhali Field Aggregation Unit",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 64,
    deposits: 7,
    offersAccepted: 6,
    exchanges: 4,
    activity: "Low activity",
  },
  {
    name: "Jamtoli Cooperative Society",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 52,
    deposits: 5,
    offersAccepted: 4,
    exchanges: 2,
    activity: "Low activity",
  },
  {
    name: "Thaingkhali Station Aggregator",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 41,
    deposits: 0,
    offersAccepted: 0,
    exchanges: 0,
    activity: "Inactive",
  },
  {
    name: "Nayapara Legacy Cooperative",
    area: "Teknaf, Cox's Bazar, Chittagong",
    farmers: 28,
    deposits: 12,
    offersAccepted: 2,
    exchanges: 1,
    activity: "Archived",
  },
];

const AGGREGATOR_ROWS: AggregatorRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  ...AGGREGATOR_ROW_TEMPLATES[i % AGGREGATOR_ROW_TEMPLATES.length],
}));

export type BuyerRow = {
  id: string;
  name: string;
  area: string;
  directOffers: number;
  demandOffers: number;
  offersAccepted: number;
  exchanges: number;
  activity: ActivityStatus;
};

const BUYER_ROWS: BuyerRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: "Kibria Traders Ltd",
  area: "Thaingkhali Station",
  directOffers: 50,
  demandOffers: 50,
  offersAccepted: 30,
  exchanges: 10,
  activity: "Active" as const,
}));

function rowActionButtons(entityLabel: string) {
  return (
    <>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="More options"
        onClick={(e) => e.preventDefault()}
      >
        <MoreHorizontal />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={`View ${entityLabel}`}
        onClick={(e) => e.preventDefault()}
      >
        <ChevronRight />
      </Button>
    </>
  );
}

function defaultRowActions(entityLabel: string) {
  return rowActionButtons(entityLabel);
}

function aggregatorRowActions(row: AggregatorRow) {
  return (
    <>
      {row.activity === "Low activity" ? (
        <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
          <MessageCircle />
          Contact
        </Button>
      ) : null}
      {row.activity === "Inactive" ? (
        <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
          <Archive />
          Archive
        </Button>
      ) : null}
      {rowActionButtons(row.name)}
    </>
  );
}

const FARMER_COLUMNS: EntityListColumn<FarmerRow>[] = [
  {
    id: "name",
    header: "Name",
    cellClassName: "whitespace-nowrap font-medium",
    render: (row) => row.name,
  },
  {
    id: "region",
    header: "Region",
    render: (row) => row.region,
  },
  {
    id: "commodities",
    header: "Commodities",
    render: (row) => (
      <div className="flex flex-wrap gap-1.5">
        {row.commodities.map((c) => (
          <Badge key={c} variant="secondary">
            {c}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "aggregationCentre",
    header: getEntityType("aggregator").singular,
    cellClassName: "max-w-[10rem]",
    render: (row) => (
      <PlaceholderEntityLink className="block truncate">
        {row.aggregationCentre}
      </PlaceholderEntityLink>
    ),
  },
  {
    id: "dateRegistered",
    header: "Date registered",
    cellClassName: "whitespace-nowrap",
    render: (row) => row.dateRegistered,
  },
  {
    id: "lastDeposit",
    header: "Last deposit",
    cellClassName: "whitespace-nowrap",
    render: (row) => row.lastDeposit,
  },
  {
    id: "activity",
    header: "Activity",
    render: (row) => <ActivityStatusBadge status={row.activity} />,
  },
];

const AGGREGATOR_COLUMNS: EntityListColumn<AggregatorRow>[] = [
  {
    id: "name",
    header: "Name",
    cellClassName: "max-w-[14rem] font-medium",
    render: (row) => <span className="line-clamp-2">{row.name}</span>,
  },
  {
    id: "area",
    header: "Area",
    cellClassName: "max-w-[11rem]",
    render: (row) => (
      <PlaceholderEntityLink className="line-clamp-2 text-sm">
        {row.area}
      </PlaceholderEntityLink>
    ),
  },
  {
    id: "farmers",
    header: getEntityType("farmer").plural,
    render: (row) => (
      <PlaceholderEntityLink className="tabular-nums">
        {row.farmers}
      </PlaceholderEntityLink>
    ),
  },
  {
    id: "deposits",
    header: "Deposits",
    render: (row) => <MetricValue value={row.deposits} />,
  },
  {
    id: "offersAccepted",
    header: "Offers accepted",
    render: (row) => <MetricValue value={row.offersAccepted} />,
  },
  {
    id: "exchanges",
    header: "Exchanges",
    render: (row) => <MetricValue value={row.exchanges} />,
  },
  {
    id: "activity",
    header: "Activity status",
    render: (row) => <ActivityStatusBadge status={row.activity} />,
  },
];

const BUYER_COLUMNS: EntityListColumn<BuyerRow>[] = [
  {
    id: "name",
    header: "Name",
    cellClassName: "whitespace-nowrap font-medium",
    render: (row) => row.name,
  },
  {
    id: "area",
    header: "Area",
    render: (row) => row.area,
  },
  {
    id: "directOffers",
    header: "Direct offers",
    render: (row) => <span className="tabular-nums">{row.directOffers}</span>,
  },
  {
    id: "demandOffers",
    header: "Demand offers",
    render: (row) => <span className="tabular-nums">{row.demandOffers}</span>,
  },
  {
    id: "offersAccepted",
    header: "Offers accepted",
    render: (row) => <span className="tabular-nums">{row.offersAccepted}</span>,
  },
  {
    id: "exchanges",
    header: "Exchanges",
    render: (row) => <span className="tabular-nums">{row.exchanges}</span>,
  },
  {
    id: "activity",
    header: "Activity status",
    render: (row) => <ActivityStatusBadge status={row.activity} />,
  },
];

const ENTITY_LIST_PAGES: {
  farmer: EntityListPageConfig<FarmerRow>;
  aggregator: EntityListPageConfig<AggregatorRow>;
  buyer: EntityListPageConfig<BuyerRow>;
} = {
  farmer: {
    entityType: "farmer",
    rows: FARMER_ROWS,
    columns: FARMER_COLUMNS,
    renderRowActions: (row) => defaultRowActions(row.name),
  },
  aggregator: {
    entityType: "aggregator",
    rows: AGGREGATOR_ROWS,
    columns: AGGREGATOR_COLUMNS,
    header: { showAdd: true },
    renderRowActions: aggregatorRowActions,
  },
  buyer: {
    entityType: "buyer",
    rows: BUYER_ROWS,
    columns: BUYER_COLUMNS,
    header: { showAdd: true },
    renderRowActions: (row) => defaultRowActions(row.name),
  },
};

function getEntityListPageConfig<R extends EntityTypeId>(
  entityType: R,
): (typeof ENTITY_LIST_PAGES)[R] {
  return ENTITY_LIST_PAGES[entityType];
}

export { ENTITY_LIST_PAGES, getEntityListPageConfig, Plus };
