import type { LucideIcon } from "lucide-react";

import {
  getCategoryIconStyles,
  getRoleCategory,
  ROW_ICON_BASE_CLASSNAME,
  TITLE_ICON_BASE_CLASSNAME,
  type CategoryColor,
  type RoleCategoryId,
} from "@/config/role-categories";
import { cn } from "@/lib/utils";

type RoleCategoryIconProps =
  | {
      role: RoleCategoryId;
      size?: "title" | "row";
      className?: string;
    }
  | {
      icon: LucideIcon;
      categoryColor: CategoryColor;
      size?: "title" | "row";
      className?: string;
    };

function RoleCategoryIcon(props: RoleCategoryIconProps) {
  const size = props.size ?? "row";
  const isTitle = size === "title";

  const Icon = "role" in props ? getRoleCategory(props.role).icon : props.icon;
  const categoryColor =
    "role" in props
      ? getRoleCategory(props.role).categoryColor
      : props.categoryColor;

  const styles = getCategoryIconStyles(categoryColor);
  const colorClass = isTitle ? styles.title : styles.row;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        isTitle ? TITLE_ICON_BASE_CLASSNAME : ROW_ICON_BASE_CLASSNAME,
        colorClass,
        props.className,
      )}
    >
      <Icon className="size-full" aria-hidden />
    </span>
  );
}

export { RoleCategoryIcon };
