import type { ReactNode } from "react";
import { Archive, ChevronRight, MessageCircle, Plus } from "lucide-react";

import { LastActiveCell } from "@/components/custom/last-active-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  AggregatorLastActive,
  BuyerLastActive,
} from "@/config/last-active";
import { mockLastActiveAt } from "@/config/mock-last-active-at";
import { getEntityType, type EntityTypeId } from "@/config/entity-types";
import { isLastActiveStale } from "@/lib/format-last-active-at";

/** Tweak layout, spacing, and shared table chrome in one place. */
export const ENTITY_LIST_PRESENTATION = {
  main: "flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10",
  pageHeader:
    "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  pageTitleGroup: "flex items-center gap-3",
  titleGroup: "flex flex-wrap items-baseline gap-2",
  title: "font-bold text-3xl",
  titleCountry: "text-sm text-muted-foreground font-normal",
  headerActions: "flex flex-wrap items-center gap-2",
  toolbar: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  toolbarStart: "flex flex-wrap items-center gap-2",
  searchWrapper: "relative min-w-[12rem] flex-1 max-w-xs",
  searchInput: "pl-9",
  actionsColumnClassName: "w-px text-right",
  rowActionsClassName: "flex items-center justify-end gap-2",
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

const ZERO_VALUE_EMDASH_CLASS = "text-neutral-alpha-300";

function ZeroValueEmDash() {
  return <span className={ZERO_VALUE_EMDASH_CLASS}>—</span>;
}

function EmptyZeroCell({ value }: { value: number }) {
  if (value === 0) {
    return <ZeroValueEmDash />;
  }
  return <span className="tabular-nums">{value}</span>;
}

function MetricValue({ value, tone }: { value: number; tone?: MetricTone }) {
  if (value === 0) {
    return <ZeroValueEmDash />;
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
    return <ZeroValueEmDash />;
  }
  return (
    <PlaceholderEntityLink className="tabular-nums">
      {value}
    </PlaceholderEntityLink>
  );
}

function areaShortLabel(area: string): string {
  const commaIndex = area.indexOf(",");
  return commaIndex === -1 ? area.trim() : area.slice(0, commaIndex).trim();
}

function AggregatorAreaCell({ area }: { area: string }) {
  const shortLabel = areaShortLabel(area);
  const hasHierarchy = area.includes(",");

  if (!hasHierarchy) {
    return <span className="line-clamp-2">{shortLabel}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="line-clamp-2 cursor-default">{shortLabel}</span>
      </TooltipTrigger>
      <TooltipContent>{area}</TooltipContent>
    </Tooltip>
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

export const AGGREGATOR_STAT_CARDS = [
  {
    id: "total",
    number: 200,
    metric: "Total aggregators",
    trend30d: 18,
  },
  {
    id: "active",
    number: 124,
    metric: "Currently active",
    numberLink: true,
    trend30d: 4,
  },
  {
    id: "recently-inactive",
    number: 52,
    metric: "Recently inactive",
    numberLink: true,
    trend30d: 3,
    invertTrendColors: true,
  },
  {
    id: "never-active",
    number: 24,
    metric: "Never active",
    numberLink: true,
    trend30d: -2,
    invertTrendColors: true,
  },
] as const;

export const BUYER_STAT_CARDS = [
  {
    id: "total",
    number: 200,
    metric: "Total buyers",
    trend30d: 18,
  },
  {
    id: "active",
    number: 124,
    metric: "Currently active",
    numberLink: true,
    trend30d: 4,
  },
  {
    id: "recently-inactive",
    number: 52,
    metric: "Recently inactive",
    numberLink: true,
    trend30d: 3,
    invertTrendColors: true,
  },
  {
    id: "never-active",
    number: 24,
    metric: "Never active",
    numberLink: true,
    trend30d: -2,
    invertTrendColors: true,
  },
] as const;

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

export type AggregatorType = "Farmer organization" | "Cooperative";

export type AggregatorRow = {
  id: string;
  name: string;
  type: AggregatorType;
  area: string;
  farmers: number;
  deposits: number;
  offersReceived: number;
  offersAccepted: number;
  exchanges: number;
  farmerPayments: number;
  lastActive: AggregatorLastActive;
};

const AGGREGATOR_ROW_TEMPLATES: Omit<AggregatorRow, "id">[] = [
  {
    name: "Kutupalong Agricultural Production Cooperative",
    type: "Cooperative",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 87,
    deposits: 42,
    offersReceived: 56,
    offersAccepted: 18,
    exchanges: 12,
    farmerPayments: 38,
    lastActive: {
      activity: "Exchange recorded",
      at: mockLastActiveAt.hoursAgo(2),
    },
  },
  {
    name: "Balukhali Field Aggregation Unit",
    type: "Farmer organization",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 64,
    deposits: 7,
    offersReceived: 14,
    offersAccepted: 6,
    exchanges: 4,
    farmerPayments: 9,
    lastActive: {
      activity: "Offer responded",
      at: mockLastActiveAt.daysAgo(1, { hours: 8, minutes: 54 }),
    },
  },
  {
    name: "Jamtoli Cooperative Society",
    type: "Cooperative",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 52,
    deposits: 5,
    offersReceived: 11,
    offersAccepted: 4,
    exchanges: 2,
    farmerPayments: 7,
    lastActive: {
      activity: "Deposit collected",
      at: mockLastActiveAt.daysAgo(2, { hours: 14, minutes: 10 }),
    },
  },
  {
    name: "Thaingkhali Station Aggregator",
    type: "Farmer organization",
    area: "Ukhiya, Cox's Bazar, Chittagong",
    farmers: 41,
    deposits: 0,
    offersReceived: 0,
    offersAccepted: 0,
    exchanges: 0,
    farmerPayments: 0,
    lastActive: null,
  },
  {
    name: "Nayapara Legacy Cooperative",
    type: "Cooperative",
    area: "Teknaf, Cox's Bazar, Chittagong",
    farmers: 28,
    deposits: 12,
    offersReceived: 8,
    offersAccepted: 2,
    exchanges: 1,
    farmerPayments: 5,
    lastActive: {
      activity: "Farmer payment recorded",
      at: mockLastActiveAt.staleDaysAgo(42),
    },
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
  lastActive: BuyerLastActive;
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
    lastActive: {
      activity: "Offer accepted",
      at: mockLastActiveAt.hoursAgo(1),
    },
  },
  {
    name: "Balukhali Retail Market",
    type: "Retailer",
    area: "Ukhiya, Cox's Bazar",
    directOffers: 42,
    demandOffers: 38,
    offersAccepted: 24,
    exchanges: 8,
    lastActive: {
      activity: "Negotiation",
      at: mockLastActiveAt.todayAt(13, 37),
    },
  },
  {
    name: "Cox's Bazar Primary School",
    type: "School",
    area: "Kutupalong, Ukhiya",
    directOffers: 18,
    demandOffers: 22,
    offersAccepted: 12,
    exchanges: 4,
    lastActive: {
      activity: "Demand offer",
      at: mockLastActiveAt.monthsAgo(1),
    },
  },
  {
    name: "Teknaf Community Store",
    type: "Retailer",
    area: "Teknaf, Cox's Bazar",
    directOffers: 35,
    demandOffers: 28,
    offersAccepted: 16,
    exchanges: 5,
    lastActive: {
      activity: "Direct offer",
      at: mockLastActiveAt.daysAgo(1, { hours: 17, minutes: 12 }),
    },
  },
  {
    name: "Jamaluddin Wholesale",
    type: "Trader",
    area: "Nayapara, Teknaf",
    directOffers: 61,
    demandOffers: 45,
    offersAccepted: 28,
    exchanges: 11,
    lastActive: {
      activity: "Bid created",
      at: mockLastActiveAt.daysAgo(2, { hours: 9, minutes: 30 }),
    },
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
    lastActive: {
      activity: "Negotiation",
      at: mockLastActiveAt.daysAgo(5, { hours: 16, minutes: 0 }),
    },
  },
  {
    name: "Bay of Bengal Trading",
    type: "Trader",
    area: "Inani, Cox's Bazar",
    directOffers: 55,
    demandOffers: 40,
    offersAccepted: 22,
    exchanges: 9,
    lastActive: {
      activity: "Offer accepted",
      at: mockLastActiveAt.staleDaysAgo(38),
    },
  },
];

const BUYER_ROWS: BuyerRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  ...BUYER_ROW_TEMPLATES[i % BUYER_ROW_TEMPLATES.length],
}));

function rowActionButtons(entityLabel: string) {
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={`View ${entityLabel}`}
      onClick={(e) => e.preventDefault()}
    >
      View
      <ChevronRight />
    </Button>
  );
}

function defaultRowActions(entityLabel: string) {
  return rowActionButtons(entityLabel);
}

function AggregatorIconActionButton({
  label,
  icon: Icon,
}: {
  label: string;
  icon: typeof MessageCircle;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={label}
          onClick={(e) => e.preventDefault()}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function aggregatorRowActions(row: AggregatorRow) {
  const stale = isLastActiveStale(row.lastActive);
  const neverActive = row.lastActive === null;

  return (
    <>
      {stale ? (
        <AggregatorIconActionButton label="Contact" icon={MessageCircle} />
      ) : null}
      {neverActive ? (
        <AggregatorIconActionButton label="Archive" icon={Archive} />
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
    render: (row) => (
      <div className="flex flex-col gap-0.5">
        <span className="line-clamp-2 font-medium">{row.name}</span>
        <span className="text-muted-foreground text-xs">{row.type}</span>
      </div>
    ),
  },
  {
    id: "area",
    header: "Area",
    cellClassName: "text-sm",
    render: (row) => <AggregatorAreaCell area={row.area} />,
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
    id: "offersReceived",
    header: "Offers received",
    render: (row) => <EmptyZeroCell value={row.offersReceived} />,
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
    id: "farmerPayments",
    header: "Farmer payments",
    render: (row) => <EmptyZeroCell value={row.farmerPayments} />,
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
    render: (row) => (
      <div className="flex flex-col gap-0.5">
        <span className="line-clamp-2 font-medium">{row.name}</span>
        <span className="text-muted-foreground text-xs">{row.type}</span>
      </div>
    ),
  },
  {
    id: "area",
    header: "Area",
    cellClassName: "text-sm",
    render: (row) => <AggregatorAreaCell area={row.area} />,
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
