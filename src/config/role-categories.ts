import type { LucideIcon } from "lucide-react";
import { Store, User, Users } from "lucide-react";

/** Tailwind palette keys used for role and metric accents. */
type CategoryColor =
  | "purple"
  | "red"
  | "orange"
  | "brown"
  | "ivory"
  | "green"
  | "aqua"
  | "blue"
  | "neutral";

type RoleCategoryId = "farmer" | "aggregator" | "buyer";

type RoleCategory = {
  id: RoleCategoryId;
  /** Display name (nav, page titles, overview cards). */
  label: string;
  icon: LucideIcon;
  categoryColor: CategoryColor;
  /** Primary list route for this role, when available. */
  listPath?: string;
};

const CATEGORY_ICON_STYLES: Record<
  CategoryColor,
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

const ROLE_CATEGORIES: Record<RoleCategoryId, RoleCategory> = {
  farmer: {
    id: "farmer",
    label: "Farmers",
    icon: User,
    categoryColor: "green",
    listPath: "/farmers",
  },
  aggregator: {
    id: "aggregator",
    label: "Aggregators",
    icon: Users,
    categoryColor: "orange",
    listPath: "/aggregators",
  },
  buyer: {
    id: "buyer",
    label: "Buyers",
    icon: Store,
    categoryColor: "blue",
    listPath: "/buyers",
  },
};

const TITLE_ICON_BASE_CLASSNAME = "size-10 rounded-lg p-2";
const ROW_ICON_BASE_CLASSNAME = "size-8 rounded-md p-1.5";

function getRoleCategory(id: RoleCategoryId): RoleCategory {
  return ROLE_CATEGORIES[id];
}

function getCategoryIconStyles(categoryColor: CategoryColor) {
  return CATEGORY_ICON_STYLES[categoryColor];
}

export {
  type CategoryColor,
  type RoleCategory,
  type RoleCategoryId,
  CATEGORY_ICON_STYLES,
  ROLE_CATEGORIES,
  TITLE_ICON_BASE_CLASSNAME,
  ROW_ICON_BASE_CLASSNAME,
  getRoleCategory,
  getCategoryIconStyles,
};
