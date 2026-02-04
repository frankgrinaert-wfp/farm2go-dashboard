import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

function Code({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"code"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "code";

  return (
    <Comp
      data-slot="link"
      className={cn(
        "rounded-sm bg-neutral-alpha-100 px-1 py-0.75 font-mono text-[0.875em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Code };
