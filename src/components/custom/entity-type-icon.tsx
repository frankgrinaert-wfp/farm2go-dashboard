import type { LucideIcon } from "lucide-react";

import {
  getEntityColorStyles,
  getEntityType,
  ROW_ICON_BASE_CLASSNAME,
  TITLE_ICON_BASE_CLASSNAME,
  type EntityColor,
  type EntityTypeId,
} from "@/config/entity-types";
import { cn } from "@/lib/utils";

type EntityTypeIconProps =
  | {
      entityType: EntityTypeId;
      size?: "title" | "row";
      className?: string;
    }
  | {
      icon: LucideIcon;
      color: EntityColor;
      size?: "title" | "row";
      className?: string;
    };

function EntityTypeIcon(props: EntityTypeIconProps) {
  const size = props.size ?? "row";
  const isTitle = size === "title";

  const Icon =
    "entityType" in props ? getEntityType(props.entityType).icon : props.icon;
  const color =
    "entityType" in props
      ? getEntityType(props.entityType).color
      : props.color;

  const styles = getEntityColorStyles(color);
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

export { EntityTypeIcon };
