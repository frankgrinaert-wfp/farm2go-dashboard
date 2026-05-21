import {
  ArrowUpDown,
  ListFilter,
  Search,
  SquareArrowOutUpRight,
} from "lucide-react";

import { RoleCategoryIcon } from "@/components/custom/role-category-icon";
import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ENTITY_LIST_PRESENTATION,
  getEntityListPageConfig,
  Plus,
  type EntityListPageConfig,
} from "@/config/entity-list-pages";
import { getRoleCategory, type RoleCategoryId } from "@/config/role-categories";
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

type EntityListPageProps = {
  role: RoleCategoryId;
};

function EntityListPage({ role }: EntityListPageProps) {
  const config = getEntityListPageConfig(role) as EntityListPageConfig<{
    id: string;
  }>;
  const roleCategory = getRoleCategory(role);
  const presentation = ENTITY_LIST_PRESENTATION;

  return (
    <main className={presentation.main}>
      <div className={presentation.pageHeader}>
        <h1 className={presentation.title}>{roleCategory.label}</h1>
        {config.header?.showTableau || config.header?.showAdd ? (
          <div className={presentation.headerActions}>
            {config.header.showTableau && config.header.tableauUrl ? (
              <Button variant="outline" asChild>
                <a
                  href={config.header.tableauUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.header.tableauLabel ?? "View in Tableau"}
                  <SquareArrowOutUpRight />
                </a>
              </Button>
            ) : null}
            {config.header.showAdd ? (
              <Button onClick={(e) => e.preventDefault()}>
                <Plus />
                {config.header.addLabel ?? roleCategory.label.slice(0, -1)}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={presentation.toolbar}>
        <div className={presentation.toolbarStart}>
          <div className={presentation.searchWrapper}>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search"
              className={presentation.searchInput}
              aria-label={config.searchAriaLabel}
            />
          </div>
          <Button variant="outline">
            <ListFilter />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowUpDown />
            Sort
          </Button>
        </div>
        <TimeRangeTabs />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={presentation.tableIconColumnClassName}>
              <span className="sr-only">{roleCategory.label}</span>
            </TableHead>
            {config.columns.map((column) => (
              <TableHead key={column.id} className={column.headerClassName}>
                {column.header}
              </TableHead>
            ))}
            {config.renderRowActions ? (
              <TableHead className={presentation.actionsColumnClassName}>
                <span className="sr-only">Actions</span>
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {config.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={presentation.tableIconColumnClassName}>
                <RoleCategoryIcon role={role} />
              </TableCell>
              {config.columns.map((column) => (
                <TableCell key={column.id} className={column.cellClassName}>
                  {column.render(row)}
                </TableCell>
              ))}
              {config.renderRowActions ? (
                <TableCell className={presentation.actionsColumnClassName}>
                  <div className={presentation.rowActionsClassName}>
                    {config.renderRowActions(row)}
                  </div>
                </TableCell>
              ) : null}
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

export { EntityListPage };
