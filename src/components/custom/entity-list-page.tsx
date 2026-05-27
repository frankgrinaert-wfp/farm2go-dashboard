import { ArrowUpDown, ListFilter, Search } from "lucide-react";

import { EntityListStatCardsRow } from "@/components/custom/entity-list-stat-card";
import { EntityListMetricItemsRow } from "@/components/custom/entity-list-metric-items-row";
import { EntityTypeIcon } from "@/components/custom/entity-type-icon";
import { TimeRangeTabs } from "@/components/custom/time-range-tabs";
import { Button } from "@/components/ui/button";
import {
  AGGREGATOR_STAT_CARDS,
  BUYER_STAT_CARDS,
  ENTITY_LIST_PAGES,
  AGGREGATOR_METRIC_ITEMS,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type EntityListPageProps = {
  entityType: EntityTypeId;
};

function EntityListTable<TRow extends { id: string }>({
  config,
}: {
  config: EntityListPageConfig<TRow>;
}) {
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
            <TableHead className="w-px pl-10 text-right">
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
              <TableCell className="w-px pl-10 text-right">
                <div className="flex items-center justify-end gap-2">
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
    <main className="flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <EntityTypeIcon entityType={entityType} size="title" />
          <h1 className="font-bold text-3xl">{entity.plural}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <TimeRangeTabs />
          {config.header?.showAdd ? (
            <Button onClick={(e) => e.preventDefault()}>
              <Plus />
              New {entity.singular}
            </Button>
          ) : null}
        </div>
      </div>

      {entityType === "aggregator" ? (
        <>
          <EntityListStatCardsRow cards={[...AGGREGATOR_STAT_CARDS]} />
          <EntityListMetricItemsRow items={AGGREGATOR_METRIC_ITEMS} />
        </>
      ) : null}
      {entityType === "buyer" ? (
        <EntityListStatCardsRow cards={[...BUYER_STAT_CARDS]} />
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <InputGroup className="flex-1 w-2xs">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder={entity.searchPlaceholder}
              aria-label={entitySearchAriaLabel(entityType)}
            />
          </InputGroup>
          <Button variant="outline">
            <ListFilter />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowUpDown />
            Sort
          </Button>
        </div>
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
