import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Ban,
  FilePenLine,
  HandCoins,
  Handshake,
  LogIn,
  Mail,
  Megaphone,
  MessagesSquare,
  ShoppingBasket,
  Sprout,
  Store,
  User,
  Users,
  Forward,
  MailOpen,
} from "lucide-react";
import type { CategoryColor, MetricItem } from "@/components/custom/metrics-column-card";
import { getMetricDetailListIcon } from "@/config/metric-detail-config";

export type MetricStatus =
  | "healthy"
  | "needs-attention"
  | "no-activity"
  | "improving"
  | "declining";

export type SnapshotMetric = {
  label: string;
  value: string;
  context?: string;
  percentage?: string;
  status?: MetricStatus;
  trend?: { direction: "up" | "down"; value: string };
  emptyGuidance?: string;
};

export type AttentionItem = {
  id: string;
  label: string;
  count: number;
  href: string;
};

export type FunnelStep = {
  label: string;
  value: number;
  formattedValue: string;
};

export type RoleCardData = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  categoryColor: CategoryColor;
  defaultMetrics: MetricItem[];
  expandedMetrics: MetricItem[];
};

export const COUNTRY_OVERVIEW_LABEL = "Bangladesh Overview";

export const SNAPSHOT_METRICS: SnapshotMetric[] = [
  {
    label: "Registered Aggregators",
    value: "32",
    status: "healthy",
    trend: { direction: "up", value: "+4 vs previous 30 days" },
  },
  {
    label: "Active Aggregators",
    value: "18",
    context: "of 32 registered",
    percentage: "56%",
    status: "needs-attention",
    trend: { direction: "down", value: "-8% vs previous 30 days" },
  },
  {
    label: "Farmers Registered",
    value: "2,897",
    status: "healthy",
    trend: { direction: "up", value: "+12% vs previous 30 days" },
  },
  {
    label: "Farmers with Produce Recorded",
    value: "412",
    context: "of 2,897 registered",
    percentage: "14%",
    status: "needs-attention",
    trend: { direction: "up", value: "+6% vs previous 30 days" },
  },
  {
    label: "Offers / Demands Created",
    value: "35",
    context: "by 8 of 35 buyers",
    percentage: "23%",
    status: "needs-attention",
    trend: { direction: "down", value: "-40% vs previous 30 days" },
    emptyGuidance:
      "No buyer offers in this period. Follow up with registered buyers or onboard local traders.",
  },
  {
    label: "Exchanges Completed",
    value: "12",
    status: "improving",
    trend: { direction: "up", value: "+18% vs previous 30 days" },
  },
  {
    label: "Estimated Exchange Value",
    value: "$8,420",
    status: "healthy",
    trend: { direction: "up", value: "+22% vs previous 30 days" },
  },
];

export const ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "inactive-aggregators",
    label: "Aggregators registered but inactive in last 30 days",
    count: 14,
    href: "#",
  },
  {
    id: "buyers-no-offers",
    label: "Buyers registered but no offers created",
    count: 27,
    href: "#",
  },
  {
    id: "farmers-no-produce",
    label: "Farmers registered without produce recorded",
    count: 620,
    href: "#",
  },
  {
    id: "offers-not-exchanged",
    label: "Accepted offers not completed as exchanges",
    count: 8,
    href: "#",
  },
  {
    id: "exchanges-no-payment",
    label: "Exchanges without payment recorded",
    count: 3,
    href: "#",
  },
];

export const FUNNEL_STEPS: FunnelStep[] = [
  { label: "Aggregators registered", value: 32, formattedValue: "32" },
  { label: "Aggregators active", value: 18, formattedValue: "18" },
  { label: "Farmers registered", value: 2897, formattedValue: "2,897" },
  { label: "Farmers with produce", value: 412, formattedValue: "412" },
  { label: "Offers / demands", value: 35, formattedValue: "35" },
  { label: "Offers accepted", value: 18, formattedValue: "18" },
  { label: "Exchanges completed", value: 12, formattedValue: "12" },
  { label: "Payments recorded", value: 9, formattedValue: "9" },
];

export const ROLE_CARDS: RoleCardData[] = [
  {
    title: "Farmers Reached",
    subtitle: "2,897 registered",
    icon: User,
    categoryColor: "green",
    defaultMetrics: [
      {
        label: "Farmers registered",
        value: "2,897",
        byline: "across all aggregators",
        icon: User,
        hideByline: true,
      },
      {
        label: "Farmers with produce recorded",
        value: "412",
        byline: "14% of registered",
        icon: Sprout,
        hideByline: true,
        percentage: "14%",
        status: "needs-attention",
      },
      {
        label: "Farmers included in offers",
        value: "188",
        byline: "6% of registered",
        icon: FilePenLine,
        hideByline: true,
        percentage: "6%",
      },
      {
        label: "Farmers linked to completed exchanges",
        value: "95",
        byline: "3% of registered",
        icon: ArrowLeftRight,
        hideByline: true,
        percentage: "3%",
      },
    ],
    expandedMetrics: [
      {
        label: "Farmer commodities registered",
        value: "1,240",
        byline: "by 28 aggregators",
        icon: Sprout,
        percentage: "43%",
      },
      {
        label: "Harvests recorded",
        value: "890",
        byline: "by 24 aggregators",
        icon: ShoppingBasket,
      },
      {
        label: "Deposits created",
        value: "412",
        byline: "by 12 of 32 aggregators",
        icon: getMetricDetailListIcon("deposits-created"),
        detailSlug: "deposits-created",
        percentage: "38%",
      },
      {
        label: "Farmers with payment recorded",
        value: "72",
        byline: "2% of registered",
        icon: HandCoins,
        hideByline: true,
      },
      {
        label: "Farmers linked to agro-advisory content",
        value: "340",
        byline: "12% of registered",
        icon: Mail,
        hideByline: true,
      },
      {
        label: "Farmers reached through training",
        value: "156",
        byline: "5% of registered",
        icon: Users,
        hideByline: true,
      },
    ],
  },
  {
    title: "Aggregators",
    subtitle: "32 registered · 18 active",
    icon: Users,
    categoryColor: "orange",
    defaultMetrics: [
      {
        label: "Registered Aggregators",
        value: "32",
        byline: "implementation footprint",
        icon: Users,
        hideByline: true,
      },
      {
        label: "Active Aggregators",
        value: "18",
        byline: "of 32 registered",
        icon: LogIn,
        percentage: "56%",
        status: "needs-attention",
      },
      {
        label: "Aggregators creating deposits",
        value: "12",
        byline: "of 32 registered",
        icon: getMetricDetailListIcon("deposits-created"),
        detailSlug: "deposits-created",
        percentage: "38%",
      },
      {
        label: "Aggregators responding to offers",
        value: "6",
        byline: "of 32 registered",
        icon: Handshake,
        percentage: "19%",
        status: "needs-attention",
      },
    ],
    expandedMetrics: [
      {
        label: "Farmer registrations created",
        value: "2,897",
        byline: "by 28 aggregators",
        icon: getMetricDetailListIcon("farmer-registrations-created"),
        detailSlug: "farmer-registrations-created",
      },
      {
        label: "Farmer produce records updated",
        value: "1,240",
        byline: "by 24 aggregators",
        icon: getMetricDetailListIcon("farmer-commodity-events-created"),
        detailSlug: "farmer-commodity-events-created",
      },
      {
        label: "Harvests created",
        value: "890",
        byline: "by 20 aggregators",
        icon: ShoppingBasket,
      },
      {
        label: "Deposits created",
        value: "900",
        byline: "by 12 of 32 aggregators",
        icon: getMetricDetailListIcon("deposits-created"),
        detailSlug: "deposits-created",
        percentage: "38%",
        trend: { direction: "up", value: "+18%" },
      },
      {
        label: "Offers received",
        value: "42",
        byline: "by 15 aggregators",
        icon: MessagesSquare,
      },
      {
        label: "Offers accepted",
        value: "18",
        byline: "by 10 aggregators",
        icon: Handshake,
      },
      {
        label: "Offers rejected",
        value: "9",
        byline: "by 6 aggregators",
        icon: Ban,
      },
      {
        label: "Training sessions logged",
        value: "24",
        byline: "by 8 aggregators",
        icon: Users,
      },
      {
        label: "Agro-advisory content shared",
        value: "156",
        byline: "by 14 aggregators",
        icon: Forward,
      },
    ],
  },
  {
    title: "Buyers",
    subtitle: "35 registered · 8 active",
    icon: Store,
    categoryColor: "blue",
    defaultMetrics: [
      {
        label: "Registered Buyers",
        value: "35",
        byline: "market participants",
        icon: Store,
        hideByline: true,
      },
      {
        label: "Active Buyers",
        value: "8",
        byline: "of 35 registered",
        icon: LogIn,
        percentage: "23%",
        status: "needs-attention",
      },
      {
        label: "Offers / demands created",
        value: "35",
        byline: "by 8 of 35 buyers",
        icon: Megaphone,
        percentage: "23%",
        trend: { direction: "down", value: "-40%" },
      },
      {
        label: "Exchanges completed",
        value: "12",
        byline: "by 6 buyers",
        icon: ArrowLeftRight,
        trend: { direction: "up", value: "+18%" },
      },
    ],
    expandedMetrics: [
      {
        label: "Buyer web logins",
        value: "124",
        byline: "by 8 buyers",
        icon: LogIn,
      },
      {
        label: "Direct offers created",
        value: "22",
        byline: "by 6 buyers",
        icon: MessagesSquare,
      },
      {
        label: "Demands created",
        value: "13",
        byline: "by 4 buyers",
        icon: Megaphone,
      },
      {
        label: "Offers accepted",
        value: "18",
        byline: "by 8 buyers",
        icon: Handshake,
      },
      {
        label: "Offers rejected",
        value: "5",
        byline: "by 3 buyers",
        icon: Ban,
      },
      {
        label: "Exchanges completed",
        value: "12",
        byline: "by 6 buyers",
        icon: ArrowLeftRight,
      },
      {
        label: "Buyers with no activity",
        value: "27",
        byline: "of 35 registered",
        icon: Ban,
        percentage: "77%",
        status: "needs-attention",
      },
      {
        label: "Agro-advisory messages read",
        value: "48",
        byline: "by 5 buyers",
        icon: MailOpen,
      },
    ],
  },
];
