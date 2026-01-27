"use client";

import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { Icon } from "@/components/ui/icon";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <Icon icon={faCircleCheck} className="size-4" />,
        info: <Icon icon={faCircleInfo} className="size-4" />,
        warning: <Icon icon={faTriangleExclamation} className="size-4" />,
        error: <Icon icon={faCircleXmark} className="size-4" />,
        loading: <Icon icon={faSpinner} className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
