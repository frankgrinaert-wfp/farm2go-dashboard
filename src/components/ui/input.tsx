import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:-ms-2 h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base shadow-none outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-6.5 file:cursor-pointer file:rounded-sm file:border-0 file:bg-transparent file:px-2 file:font-semibold file:text-primary-600 file:text-sm placeholder:text-muted-foreground file:hover:bg-primary-100 file:hover:text-primary-700 file:active:bg-primary-200 file:active:text-primary-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
