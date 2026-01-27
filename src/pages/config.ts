import {
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleExclamation,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

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

const PriorityConfig = {
  CRITICAL: {
    label: "Critical",
    icon: faCircleExclamation,
    color: "text-danger-500",
  },
  HIGH: {
    label: "High",
    icon: faCircleChevronUp,
    color: "text-warning-500",
  },
  MEDIUM: {
    label: "Medium",
    icon: faCircleMinus,
    color: "text-info-500",
  },
  LOW: {
    label: "Low",
    icon: faCircleChevronDown,
    color: "text-success-500",
  },
};

export { StatusConfig, PriorityConfig };
