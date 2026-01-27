import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-none outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          className,
        )}
        {...props}
      />
      <Icon
        icon={faAngleDown}
        className="-translate-y-1/2 !size-3 !opacity-50 pointer-events-none absolute top-1/2 right-3.5 select-none text-muted-foreground"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
