import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronsUp, ChevronUp, Equal } from "lucide-react";

export type ProjectStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type ProjectPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Project {
  projectId: string;
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  assignee: string;
  dueDate: string;
}

const StatusConfig = {
  NOT_STARTED: {
    label: "Not started",
    variant: "secondary" as const,
  },
  IN_PROGRESS: {
    label: "In progress",
    variant: "default" as const,
  },
  COMPLETED: {
    label: "Done",
    variant: "success" as const,
  },
};

const PriorityConfig: Record<
  ProjectPriority,
  { label: string; icon: LucideIcon; color: string }
> = {
  CRITICAL: {
    label: "Critical",
    icon: ChevronsUp,
    color: "text-danger-500",
  },
  HIGH: {
    label: "High",
    icon: ChevronUp,
    color: "text-danger-500",
  },
  MEDIUM: {
    label: "Medium",
    icon: Equal,
    color: "text-warning-500",
  },
  LOW: {
    label: "Low",
    icon: ChevronDown,
    color: "text-info-500",
  },
};

export { StatusConfig, PriorityConfig };
