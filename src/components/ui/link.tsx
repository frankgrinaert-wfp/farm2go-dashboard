import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Link({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="link"
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-sm text-primary-600 underline-offset-2 outline-none transition-colors hover:text-primary-700 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:text-primary-800 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export { Link };
