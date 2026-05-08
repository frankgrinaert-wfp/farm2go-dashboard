import {
  ArrowLeftRight,
  BadgeDollarSign,
  Boxes,
  CircleSlash,
  HandCoins,
  House,
  MessageSquare,
  Package,
  PackageOpen,
  ShoppingBag,
  Sprout,
  Store,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  MetricsColumnCard,
  type MetricItem,
} from "@/components/custom/metrics-column-card";

type MetricsColumn = {
  title: string;
  total: string;
  icon: typeof Users;
  titleIconClassName: string;
  metrics: MetricItem[];
};

const METRICS_COLUMNS: MetricsColumn[] = [
  {
    title: "Farmers",
    total: "1000 total",
    icon: User,
    titleIconClassName: "size-12 rounded-lg p-2.5 text-green-600 bg-green-100",
    metrics: [
      {
        label: "Farmer produces created",
        value: "1000",
        byline: "by 20 Farmers",
        icon: Sprout,
      },
      {
        label: "Harvests created",
        value: "1000",
        byline: "by 20 Farmers",
        icon: Package,
      },
      {
        label: "Deposits created",
        value: "1000",
        byline: "by 20 Farmers",
        icon: Boxes,
      },
      {
        label: "Farmers with produce added to an offer",
        value: "1000",
        byline: "by 20 Farmers",
        icon: PackageOpen,
      },
      {
        label: "Farmers with produce exchanged",
        value: "1000",
        byline: "by 20 Farmers",
        icon: ArrowLeftRight,
      },
      {
        label: "Farmers that received payments",
        value: "1000",
        byline: "by 20 Farmers",
        icon: HandCoins,
      },
      {
        label: "Farmers linked to Agro-Advisory content",
        value: "1000",
        byline: "by 20 Farmers",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Aggregation Centres",
    total: "1000 total",
    icon: Users,
    titleIconClassName: "size-12 rounded-lg p-2.5 text-green-600 bg-green-100",
    metrics: [
      {
        label: "Farmer registrations created",
        value: "1200",
        byline: "by 20 Aggregation Centres",
        icon: UserPlus,
      },
      {
        label: "Farmer commodity events created",
        value: "800",
        byline: "by 20 Aggregation Centres",
        icon: ShoppingBag,
      },
      {
        label: "Farmer harvests created",
        value: "700",
        byline: "by 20 Aggregation Centres",
        icon: Package,
      },
      {
        label: "Deposits created",
        value: "900",
        byline: "by 20 Aggregation Centres",
        icon: Boxes,
      },
      {
        label: "Offers received",
        value: "1500",
        byline: "by 20 Aggregation Centres",
        icon: PackageOpen,
      },
      {
        label: "Offers accepted",
        value: "1100",
        byline: "by 20 Aggregation Centres",
        icon: HandCoins,
      },
      {
        label: "Offers rejected",
        value: "400",
        byline: "by 20 Aggregation Centres",
        icon: CircleSlash,
      },
      {
        label: "Exchanges completed",
        value: "650",
        byline: "by 20 Aggregation Centres",
        icon: ArrowLeftRight,
      },
      {
        label: "Farmer payments marked as done",
        value: "950",
        byline: "by 20 Aggregation Centres",
        icon: BadgeDollarSign,
      },
      {
        label: "Agro-Advisory messages received",
        value: "1800",
        byline: "by 20 Aggregation Centres",
        icon: MessageSquare,
      },
      {
        label: "Agro-Advisory messages read",
        value: "1600",
        byline: "by 20 Aggregation Centres",
        icon: MessageSquare,
      },
      {
        label: "Agro-Advisory messages shared",
        value: "500",
        byline: "by 20 Aggregation Centres",
        icon: MessageSquare,
      },
      {
        label: "App login (mobile)",
        value: "3000",
        byline: "by 20 Aggregation Centres",
        icon: House,
      },
    ],
  },
  {
    title: "Buyers",
    total: "1000 total",
    icon: Store,
    titleIconClassName: "size-12 rounded-lg p-2.5 text-blue-600 bg-blue-100",
    metrics: [
      {
        label: "App login (web)",
        value: "1500",
        byline: "by 20 Buyers",
        icon: House,
      },
      {
        label: "Direct offers created",
        value: "300",
        byline: "by 20 Buyers",
        icon: ShoppingBag,
      },
      {
        label: "Demands created",
        value: "250",
        byline: "by 20 Buyers",
        icon: Package,
      },
      {
        label: "Offers accepted (by Aggregator or Buyer)",
        value: "180",
        byline: "by 20 Buyers",
        icon: HandCoins,
      },
      {
        label: "Offers rejected",
        value: "45",
        byline: "by 20 Buyers",
        icon: CircleSlash,
      },
      {
        label: "Exchanges completed for buyer-created offers",
        value: "120",
        byline: "by 20 Buyers",
        icon: ArrowLeftRight,
      },
    ],
  },
];

function OverviewMetricsSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-3">
      {METRICS_COLUMNS.map((column) => (
        <MetricsColumnCard
          key={column.title}
          title={column.title}
          total={column.total}
          icon={column.icon}
          titleIconClassName={column.titleIconClassName}
          metrics={column.metrics}
        />
      ))}
    </section>
  );
}

export { OverviewMetricsSection };
