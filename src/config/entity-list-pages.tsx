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
import { cn } from "@/lib/utils";

/** Tweak layout, spacing, and shared table chrome in one place. */
export const ENTITY_LIST_PRESENTATION = {
  main: "flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10",
  pageHeader:
    "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  pageTitleGroup: "flex items-center gap-3",
  title: "font-bold text-3xl",
  headerActions: "flex flex-wrap items-center gap-2",
  toolbar: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  toolbarStart: "flex flex-wrap items-center gap-2",
  searchWrapper: "relative min-w-[12rem] flex-1 max-w-xs",
  searchInput: "pl-9",
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

function EmptyZeroCell({ value }: { value: number }) {
  if (value === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  return <span className="tabular-nums">{value}</span>;
}

function MetricValue({ value, tone }: { value: number; tone?: MetricTone }) {
  if (value === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  const resolved = tone ?? getMetricTone(value);
  return (
    <span className={`tabular-nums ${METRIC_TONE_CLASS[resolved]}`}>
      {value}
    </span>
  );
}

function LinkedCountCell({ value }: { value: number }) {
  if (value === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <PlaceholderEntityLink className="tabular-nums">
      {value}
    </PlaceholderEntityLink>
  );
}

function parseDisplayDate(value: string): Date | null {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function daysSince(date: Date): number {
  const ms = Date.now() - date.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function isLastActiveStale(lastActive: string | null): boolean {
  if (lastActive === null) return false;
  const date = parseDisplayDate(lastActive);
  return date !== null && daysSince(date) >= 30;
}

function LastActiveCell({ lastActive }: { lastActive: string | null }) {
  if (lastActive === null) {
    return <span className="text-muted-foreground">—</span>;
  }

  const stale = isLastActiveStale(lastActive);

  return (
    <span
      className={cn(
        "whitespace-nowrap tabular-nums",
        stale && "text-warning-600",
      )}
    >
      {lastActive}
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
  /** Display date string, or null if never active. */
  lastActive: string | null;
};

const AGGREGATOR_ROW_TEMPLATES: Omit<AggregatorRow, "id">[] = [
  {
    name: "Kutupalong Agricultural Production Cooperative",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 87,
    deposits: 42,
    offersAccepted: 18,
    exchanges: 12,
    lastActive: "19 May 2026",
  },
  {
    name: "Balukhali Field Aggregation Unit",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 64,
    deposits: 7,
    offersAccepted: 6,
    exchanges: 4,
    lastActive: "8 Apr 2026",
  },
  {
    name: "Jamtoli Cooperative Society",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 52,
    deposits: 5,
    offersAccepted: 4,
    exchanges: 2,
    lastActive: "15 Mar 2026",
  },
  {
    name: "Thaingkhali Station Aggregator",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 41,
    deposits: 0,
    offersAccepted: 0,
    exchanges: 0,
    lastActive: null,
  },
  {
    name: "Nayapara Legacy Cooperative",
    area: "Teknaf, Cox's Bazar, Chittagong",
    farmers: 28,
    deposits: 12,
    offersAccepted: 2,
    exchanges: 1,
    lastActive: "2 Feb 2026",
  },
];

const AGGREGATOR_ROWS: AggregatorRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  ...AGGREGATOR_ROW_TEMPLATES[i % AGGREGATOR_ROW_TEMPLATES.length],
}));

export type BuyerType = "Retailer" | "Trader" | "School";

export type BuyerRow = {
  id: string;
  name: string;
  type: BuyerType;
  area: string;
  directOffers: number;
  demandOffers: number;
  offersAccepted: number;
  exchanges: number;
  /** Display date string, or null if never active. */
  lastActive: string | null;
};

const BUYER_ROW_TEMPLATES: Omit<BuyerRow, "id">[] = [
  {
    name: "Kibria Traders Ltd",
    type: "Trader",
    area: "Thaingkhali Station",
    directOffers: 50,
    demandOffers: 50,
    offersAccepted: 30,
    exchanges: 10,
    lastActive: "20 May 2026",
  },
  {
    name: "Balukhali Retail Market",
    type: "Retailer",
    area: "Ukhiya, Cox's Bazar",
    directOffers: 42,
    demandOffers: 38,
    offersAccepted: 24,
    exchanges: 8,
    lastActive: "14 May 2026",
  },
  {
    name: "Cox's Bazar Primary School",
    type: "School",
    area: "Kutupalong, Ukhiya",
    directOffers: 18,
    demandOffers: 22,
    offersAccepted: 12,
    exchanges: 4,
    lastActive: "22 Mar 2026",
  },
  {
    name: "Teknaf Community Store",
    type: "Retailer",
    area: "Teknaf, Cox's Bazar",
    directOffers: 35,
    demandOffers: 28,
    offersAccepted: 16,
    exchanges: 5,
    lastActive: "6 May 2026",
  },
  {
    name: "Jamaluddin Wholesale",
    type: "Trader",
    area: "Nayapara, Teknaf",
    directOffers: 61,
    demandOffers: 45,
    offersAccepted: 28,
    exchanges: 11,
    lastActive: "17 May 2026",
  },
  {
    name: "Shamlapur High School",
    type: "School",
    area: "Shamlapur, Teknaf",
    directOffers: 12,
    demandOffers: 15,
    offersAccepted: 6,
    exchanges: 2,
    lastActive: null,
  },
  {
    name: "Rohingya Relief Retail Co-op",
    type: "Retailer",
    area: "Balukhali, Ukhiya",
    directOffers: 29,
    demandOffers: 31,
    offersAccepted: 14,
    exchanges: 6,
    lastActive: "28 Mar 2026",
  },
  {
    name: "Bay of Bengal Trading",
    type: "Trader",
    area: "Inani, Cox's Bazar",
    directOffers: 55,
    demandOffers: 40,
    offersAccepted: 22,
    exchanges: 9,
    lastActive: "11 May 2026",
  },
];

const BUYER_ROWS: BuyerRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  ...BUYER_ROW_TEMPLATES[i % BUYER_ROW_TEMPLATES.length],
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
  const stale = isLastActiveStale(row.lastActive);
  const neverActive = row.lastActive === null;

  return (
    <>
      {stale ? (
        <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
          <MessageCircle />
          Contact
        </Button>
      ) : null}
      {neverActive ? (
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
    render: (row) => <LinkedCountCell value={row.farmers} />,
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
    id: "lastActive",
    header: "Last active",
    cellClassName: "whitespace-nowrap",
    render: (row) => <LastActiveCell lastActive={row.lastActive} />,
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
    id: "type",
    header: "Type",
    cellClassName: "whitespace-nowrap",
    render: (row) => row.type,
  },
  {
    id: "area",
    header: "Area",
    render: (row) => row.area,
  },
  {
    id: "directOffers",
    header: "Direct offers",
    render: (row) => <EmptyZeroCell value={row.directOffers} />,
  },
  {
    id: "demandOffers",
    header: "Demand offers",
    render: (row) => <EmptyZeroCell value={row.demandOffers} />,
  },
  {
    id: "offersAccepted",
    header: "Offers accepted",
    render: (row) => <EmptyZeroCell value={row.offersAccepted} />,
  },
  {
    id: "exchanges",
    header: "Exchanges",
    render: (row) => <EmptyZeroCell value={row.exchanges} />,
  },
  {
    id: "lastActive",
    header: "Last active",
    cellClassName: "whitespace-nowrap",
    render: (row) => <LastActiveCell lastActive={row.lastActive} />,
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
