import { ArrowUpDown, ListFilter, Search } from "lucide-react";

import { EntityListStatCardsRow } from "@/components/custom/entity-list-stat-card";
import { EntityTypeIcon } from "@/components/custom/entity-type-icon";
import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AGGREGATOR_STAT_CARDS,
  ENTITY_LIST_PAGES,
  ENTITY_LIST_PRESENTATION,
  getEntityListPageConfig,
  Plus,
  type EntityListPageConfig,
} from "@/config/entity-list-pages";
import {
  entitySearchAriaLabel,
  getEntityType,
  type EntityTypeId,
} from "@/config/entity-types";
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
  entityType: EntityTypeId;
};

function EntityListTable<TRow extends { id: string }>({
  config,
}: {
  config: EntityListPageConfig<TRow>;
}) {
  const presentation = ENTITY_LIST_PRESENTATION;

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
  );
}

function EntityListPage({ entityType }: EntityListPageProps) {
  const config = getEntityListPageConfig(entityType);
  const entity = getEntityType(entityType);
  const presentation = ENTITY_LIST_PRESENTATION;

  const table = (() => {
    switch (entityType) {
      case "farmer":
        return <EntityListTable config={ENTITY_LIST_PAGES.farmer} />;
      case "aggregator":
        return <EntityListTable config={ENTITY_LIST_PAGES.aggregator} />;
      case "buyer":
        return <EntityListTable config={ENTITY_LIST_PAGES.buyer} />;
      default: {
        const _exhaustive: never = entityType;
        return _exhaustive;
      }
    }
  })();

  return (
    <main className={presentation.main}>
      <div className={presentation.pageHeader}>
        <div className={presentation.pageTitleGroup}>
          <EntityTypeIcon entityType={entityType} size="title" />
          <h1 className={presentation.title}>{entity.plural}</h1>
        </div>
        {config.header?.showAdd ? (
          <div className={presentation.headerActions}>
            <Button onClick={(e) => e.preventDefault()}>
              <Plus />
              {entity.singular}
            </Button>
          </div>
        ) : null}
      </div>

      {entityType === "aggregator" ? (
        <EntityListStatCardsRow cards={[...AGGREGATOR_STAT_CARDS]} />
      ) : null}

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
              aria-label={entitySearchAriaLabel(entityType)}
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

      {table}

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
