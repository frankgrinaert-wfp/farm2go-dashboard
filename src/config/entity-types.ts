import type { LucideIcon } from "lucide-react";
import { Store, User, Users } from "lucide-react";

/** Tailwind palette keys used for entity icons and metric accents. */
export type EntityColor =
  | "purple"
  | "red"
  | "orange"
  | "brown"
  | "ivory"
  | "green"
  | "aqua"
  | "blue"
  | "neutral";

export type EntityTypeId = "farmer" | "aggregator" | "buyer";

export type EntityType = {
  id: EntityTypeId;
  singular: string;
  plural: string;
  icon: LucideIcon;
  color: EntityColor;
  listPath: string;
  searchPlaceholder: string;
};

const ENTITY_ICON_STYLES: Record<
  EntityColor,
  { title: string; metric: string; row: string }
> = {
  purple: {
    title: "text-purple-600 bg-purple-100",
    metric: "text-purple-500",
    row: "text-purple-600 bg-purple-100",
  },
  red: {
    title: "text-red-600 bg-red-100",
    metric: "text-red-500",
    row: "text-red-600 bg-red-100",
  },
  orange: {
    title: "text-orange-600 bg-orange-100",
    metric: "text-orange-500",
    row: "text-orange-600 bg-orange-100",
  },
  brown: {
    title: "text-brown-700 bg-brown-100",
    metric: "text-brown-600",
    row: "text-brown-700 bg-brown-100",
  },
  ivory: {
    title: "text-ivory-700 bg-ivory-100",
    metric: "text-ivory-600",
    row: "text-ivory-700 bg-ivory-100",
  },
  green: {
    title: "text-green-600 bg-green-100",
    metric: "text-green-500",
    row: "text-green-600 bg-green-100",
  },
  aqua: {
    title: "text-aqua-600 bg-aqua-100",
    metric: "text-aqua-500",
    row: "text-aqua-600 bg-aqua-100",
  },
  blue: {
    title: "text-blue-600 bg-blue-100",
    metric: "text-blue-500",
    row: "text-blue-600 bg-blue-100",
  },
  neutral: {
    title: "text-neutral-600 bg-neutral-100",
    metric: "text-neutral-500",
    row: "text-neutral-600 bg-neutral-100",
  },
};

export const ENTITY_TYPES: Record<EntityTypeId, EntityType> = {
  farmer: {
    id: "farmer",
    singular: "Farmer",
    plural: "Farmers",
    icon: User,
    color: "orange",
    listPath: "/farmers",
    searchPlaceholder: "Search by name",
  },
  aggregator: {
    id: "aggregator",
    singular: "Aggregator",
    plural: "Aggregators",
    icon: Users,
    color: "orange",
    listPath: "/aggregators",
    searchPlaceholder: "Search by name, admin, email",
  },
  buyer: {
    id: "buyer",
    singular: "Buyer",
    plural: "Buyers",
    icon: Store,
    color: "green",
    listPath: "/buyers",
    searchPlaceholder: "Search by name, email",
  },
};

export const TITLE_ICON_BASE_CLASSNAME = "size-10 rounded-lg p-2";
export const ROW_ICON_BASE_CLASSNAME = "size-8 rounded-md p-1.5";

function getEntityType(id: EntityTypeId): EntityType {
  return ENTITY_TYPES[id];
}

function getEntityColorStyles(color: EntityColor) {
  return ENTITY_ICON_STYLES[color];
}

function entitySearchAriaLabel(id: EntityTypeId): string {
  return getEntityType(id).searchPlaceholder;
}

export {
  ENTITY_ICON_STYLES,
  getEntityType,
  getEntityColorStyles,
  entitySearchAriaLabel,
};
