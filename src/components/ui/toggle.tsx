"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "group/toggle inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold text-neutral-700 text-sm outline-none transition-[color,box-shadow] hover:bg-neutral-alpha-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:bg-neutral-alpha-200 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-primary-100 data-[state=on]:text-primary-700 data-[state=on]:active:bg-primary-200 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-neutral-alpha-300 data-[state=on]:border-primary-500",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
