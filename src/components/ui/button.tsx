import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-700 active:bg-primary-800",
        outline:
          "border border-neutral-alpha-300 bg-background text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 active:bg-neutral-200 active:text-neutral-700",
        secondary:
          "border border-primary-300 bg-background text-primary-600 hover:bg-primary-100 hover:text-primary-700 active:bg-primary-200 active:text-primary-700",
        ghost:
          "text-neutral-700 hover:bg-neutral-alpha-100 hover:text-neutral-700 active:bg-neutral-alpha-200 active:text-neutral-700",
        destructive:
          "bg-destructive text-white hover:bg-danger-700 active:bg-danger-800",
        link: "text-primary underline-offset-4 hover:text-primary-700 hover:underline active:text-primary-800",
        success:
          "bg-success-600 text-white hover:bg-success-700 active:bg-success-800",
        "success-secondary":
          "border border-success-300 bg-background text-success-600 hover:bg-success-100 hover:text-success-700 active:bg-success-200 active:text-success-700",
        "destructive-secondary":
          "border border-danger-300 bg-background text-danger-600 hover:bg-danger-100 hover:text-danger-700 active:bg-danger-200 active:text-danger-700",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
