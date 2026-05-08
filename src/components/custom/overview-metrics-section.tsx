import {
  ArrowLeftRight,
  Banknote,
  Ban,
  FilePenLine,
  HandCoins,
  Handshake,
  Mail,
  MessagesSquare,
  Package,
  ShoppingBasket,
  Sprout,
  Store,
  Timeline,
  User,
  UserPlus,
  Users,
  MailOpen,
  Forward,
  LogIn,
  Megaphone,
} from "lucide-react";
import {
  MetricsColumnCard,
  type MetricItem,
} from "@/components/custom/metrics-column-card";

type MetricsColumn = {
  title: string;
  total: string;
  icon: typeof Users;
  titleIconColorClassName: string;
  metrics: MetricItem[];
};

const METRICS_COLUMNS: MetricsColumn[] = [
  {
    title: "Farmers",
    total: "1000 total",
    icon: User,
    titleIconColorClassName: "text-orange-600 bg-orange-100",
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
        icon: ShoppingBasket,
      },
      {
        label: "Deposits created",
        value: "1000",
        byline: "by 20 Farmers",
        icon: Package,
      },
      {
        label: "Farmers with produce added to an offer",
        value: "1000",
        byline: "by 20 Farmers",
        icon: FilePenLine,
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
        icon: Mail,
      },
    ],
  },
  {
    title: "Aggregation Centres",
    total: "1000 total",
    icon: Users,
    titleIconColorClassName: "text-orange-600 bg-orange-100",
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
        icon: Timeline,
      },
      {
        label: "Farmer harvests created",
        value: "700",
        byline: "by 20 Aggregation Centres",
        icon: ShoppingBasket,
      },
      {
        label: "Deposits created",
        value: "900",
        byline: "by 20 Aggregation Centres",
        icon: Package,
      },
      {
        label: "Offers received",
        value: "1500",
        byline: "by 20 Aggregation Centres",
        icon: MessagesSquare,
      },
      {
        label: "Offers accepted",
        value: "1100",
        byline: "by 20 Aggregation Centres",
        icon: Handshake,
      },
      {
        label: "Offers rejected",
        value: "400",
        byline: "by 20 Aggregation Centres",
        icon: Ban,
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
        icon: Banknote,
      },
      {
        label: "Agro-Advisory messages received",
        value: "1800",
        byline: "by 20 Aggregation Centres",
        icon: Mail,
      },
      {
        label: "Agro-Advisory messages read",
        value: "1600",
        byline: "by 20 Aggregation Centres",
        icon: MailOpen,
      },
      {
        label: "Agro-Advisory messages shared",
        value: "500",
        byline: "by 20 Aggregation Centres",
        icon: Forward,
      },
      {
        label: "App login (mobile)",
        value: "3000",
        byline: "by 20 Aggregation Centres",
        icon: LogIn,
      },
    ],
  },
  {
    title: "Buyers",
    total: "1000 total",
    icon: Store,
    titleIconColorClassName: "text-blue-600 bg-blue-100",
    metrics: [
      {
        label: "App login (web)",
        value: "1500",
        byline: "by 20 Buyers",
        icon: LogIn,
      },
      {
        label: "Direct offers created",
        value: "300",
        byline: "by 20 Buyers",
        icon: MessagesSquare,
      },
      {
        label: "Demands created",
        value: "250",
        byline: "by 20 Buyers",
        icon: Megaphone,
      },
      {
        label: "Offers accepted (by Aggregator or Buyer)",
        value: "180",
        byline: "by 20 Buyers",
        icon: Handshake,
      },
      {
        label: "Offers rejected",
        value: "45",
        byline: "by 20 Buyers",
        icon: Ban,
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
    <section className="grid items-start gap-8 lg:grid-cols-3">
      {METRICS_COLUMNS.map((column) => (
        <MetricsColumnCard
          key={column.title}
          title={column.title}
          total={column.total}
          icon={column.icon}
          titleIconColorClassName={column.titleIconColorClassName}
          metrics={column.metrics}
        />
      ))}
    </section>
  );
}

export { OverviewMetricsSection };
