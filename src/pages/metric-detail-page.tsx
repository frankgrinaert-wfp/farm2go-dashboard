import type { LucideIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";

import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";
import type { ColumnDef, FilterDef } from "@/config/metric-detail-config";
import { getMetricDetailConfig } from "@/config/metric-detail-config";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Cell = string | string[];

function RowIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 p-1.5">
      <Icon className="text-neutral-600" aria-hidden />
    </span>
  );
}

function PlaceholderLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href="#" onClick={(e) => e.preventDefault()}>
      {children}
    </Link>
  );
}

function renderCell(
  column: ColumnDef,
  value: Cell | undefined,
  listIcon: LucideIcon,
) {
  if (column.format === "icon-only") {
    return <RowIcon Icon={listIcon} />;
  }

  if (column.format === "link") {
    const text = typeof value === "string" ? value : "";
    return <PlaceholderLink>{text}</PlaceholderLink>;
  }

  if (column.format === "comma-links") {
    const parts = Array.isArray(value) ? value : [];
    return (
      <span className="inline-flex flex-wrap items-center gap-x-1">
        {parts.map((part, i) => (
          <React.Fragment key={`${part}-${i}`}>
            {i > 0 ? <span className="text-muted-foreground">, </span> : null}
            <PlaceholderLink>{part}</PlaceholderLink>
          </React.Fragment>
        ))}
      </span>
    );
  }

  const text = typeof value === "string" ? value : "";
  return text;
}

function MetricDetailFilterMenu({ filter }: { filter: FilterDef }) {
  const [value, setValue] = React.useState<string | null>(null);
  const displayLabel =
    value === null
      ? filter.label
      : (filter.options.find((o) => o.value === value)?.label ?? filter.label);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="truncate">{displayLabel}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10.5rem]">
        {filter.options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => setValue(opt.value)}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MetricDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? getMetricDetailConfig(slug) : undefined;

  if (!config) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <RouterLink to="/">Overview</RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{config.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-bold text-3xl">{config.title}</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-muted-foreground text-sm">{config.summary}</p>
        <div className="flex flex-wrap items-center justify-end gap-3 md:max-w-[60%]">
          {config.filters.map((filter) => (
            <MetricDetailFilterMenu key={filter.id} filter={filter} />
          ))}
          <TimeRangeTabs />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {config.columns.map((col) => (
              <TableHead
                key={col.id}
                className={cn(col.format === "icon-only" && "w-px")}
              >
                {col.format === "icon-only" ? (
                  <span className="sr-only">Row</span>
                ) : (
                  col.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {config.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {config.columns.map((col) => (
                <TableCell
                  key={col.id}
                  className={cn(col.format === "icon-only" && "w-px")}
                >
                  {renderCell(
                    col,
                    row[col.id] as Cell | undefined,
                    config.listIcon,
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              onClick={(e) => e.preventDefault()}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export { MetricDetailPage };
