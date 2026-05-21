import {
  ArrowLeftRight,
  Banknote,
  Ban,
  FilePenLine,
  HandCoins,
  Handshake,
  Mail,
  MessagesSquare,
  ShoppingBasket,
  Sprout,
  MailOpen,
  Forward,
  LogIn,
  Megaphone,
} from "lucide-react";
import {
  MetricsColumnCard,
  type MetricItem,
} from "@/components/custom/metrics-column-card";
import { getMetricDetailListIcon } from "@/config/metric-detail-config";
import type { EntityTypeId } from "@/config/entity-types";

type MetricsColumn = {
  entityType: EntityTypeId;
  total: string;
  metrics: MetricItem[];
};

const METRICS_COLUMNS: MetricsColumn[] = [
  {
    entityType: "farmer",
    total: "1000 total",
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
        icon: getMetricDetailListIcon("deposits-created"),
        detailSlug: "deposits-created",
      },
      {
        label: "Farmers with produce added to an offer",
        value: "1000",
        byline: "by 20 Farmers",
        icon: FilePenLine,
        hideByline: true,
      },
      {
        label: "Farmers with produce exchanged",
        value: "1000",
        byline: "by 20 Farmers",
        icon: ArrowLeftRight,
        hideByline: true,
      },
      {
        label: "Farmers that received payments",
        value: "1000",
        byline: "by 20 Farmers",
        icon: HandCoins,
        hideByline: true,
      },
      {
        label: "Farmers linked to Agro-Advisory content",
        value: "1000",
        byline: "by 20 Farmers",
        icon: Mail,
        hideByline: true,
      },
    ],
  },
  {
    entityType: "aggregator",
    total: "1000 total",
    metrics: [
      {
        label: "Farmer registrations created",
        value: "1200",
        byline: "by 20 Aggregators",
        icon: getMetricDetailListIcon("farmer-registrations-created"),
        detailSlug: "farmer-registrations-created",
      },
      {
        label: "Farmer commodity events created",
        value: "800",
        byline: "by 20 Aggregators",
        icon: getMetricDetailListIcon("farmer-commodity-events-created"),
        detailSlug: "farmer-commodity-events-created",
      },
      {
        label: "Farmer harvests created",
        value: "700",
        byline: "by 20 Aggregators",
        icon: ShoppingBasket,
      },
      {
        label: "Deposits created",
        value: "900",
        byline: "by 20 Aggregators",
        icon: getMetricDetailListIcon("deposits-created"),
        detailSlug: "deposits-created",
      },
      {
        label: "Offers received",
        value: "1500",
        byline: "by 20 Aggregators",
        icon: MessagesSquare,
      },
      {
        label: "Offers accepted",
        value: "1100",
        byline: "by 20 Aggregators",
        icon: Handshake,
      },
      {
        label: "Offers rejected",
        value: "400",
        byline: "by 20 Aggregators",
        icon: Ban,
      },
      {
        label: "Exchanges completed",
        value: "650",
        byline: "by 20 Aggregators",
        icon: ArrowLeftRight,
      },
      {
        label: "Farmer payments marked as done",
        value: "950",
        byline: "by 20 Aggregators",
        icon: Banknote,
      },
      {
        label: "Agro-Advisory messages received",
        value: "1800",
        byline: "by 20 Aggregators",
        icon: Mail,
      },
      {
        label: "Agro-Advisory messages read",
        value: "1600",
        byline: "by 20 Aggregators",
        icon: MailOpen,
      },
      {
        label: "Agro-Advisory messages shared",
        value: "500",
        byline: "by 20 Aggregators",
        icon: Forward,
      },
      {
        label: "App login (mobile)",
        value: "3000",
        byline: "by 20 Aggregators",
        icon: LogIn,
      },
    ],
  },
  {
    entityType: "buyer",
    total: "1000 total",
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
    <section className="grid items-start gap-7 lg:grid-cols-3">
      {METRICS_COLUMNS.map((column) => (
        <MetricsColumnCard
          key={column.entityType}
          entityType={column.entityType}
          total={column.total}
          metrics={column.metrics}
        />
      ))}
    </section>
  );
}

export { OverviewMetricsSection };
