import { ArrowUpDown, ChevronRight, ListFilter, Search } from "lucide-react";
import { RoleCategoryIcon } from "@/components/custom/role-category-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
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
  FARMERS_LIST_ROWS,
  type FarmerActivity,
  type FarmerRow,
} from "@/config/farmers-list-config";

const ACTIVITY_BADGE_VARIANT: Record<
  FarmerActivity,
  "success" | "secondary" | "warning"
> = {
  Active: "success",
  Inactive: "secondary",
  "No recent activity": "warning",
};

function FarmerActivityBadge({ activity }: { activity: FarmerActivity }) {
  return <Badge variant={ACTIVITY_BADGE_VARIANT[activity]}>{activity}</Badge>;
}

function FarmersTableRow({ farmer }: { farmer: FarmerRow }) {
  return (
    <TableRow>
      <TableCell className="w-px">
        <RoleCategoryIcon role="farmer" />
      </TableCell>
      <TableCell className="whitespace-nowrap">{farmer.name}</TableCell>
      <TableCell>{farmer.region}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1.5">
          {farmer.commodities.map((commodity) => (
            <Badge key={commodity} variant="secondary">
              {commodity}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="max-w-[10rem]">
        <Link
          href="#"
          className="block truncate"
          onClick={(e) => e.preventDefault()}
        >
          {farmer.aggregationCentre}
        </Link>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {farmer.dateRegistered}
      </TableCell>
      <TableCell className="whitespace-nowrap">{farmer.lastDeposit}</TableCell>
      <TableCell>
        <FarmerActivityBadge activity={farmer.activity} />
      </TableCell>
      <TableCell className="w-px">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          aria-label={`View ${farmer.name}`}
          onClick={(e) => e.preventDefault()}
        >
          <ChevronRight className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function FarmersPage() {
  return (
    <main className="flex flex-col gap-6 py-4 px-6 sm:py-6 sm:px-8 md:py-8 md:px-10">
      <h1 className="font-bold text-3xl">Farmers</h1>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-3xs flex-1 max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search"
            className="pl-9"
            aria-label="Search farmers"
          />
        </div>
        <Button variant="outline">
          <ListFilter className="size-4" />
          Filter
        </Button>
        <Button variant="outline">
          <ArrowUpDown className="size-4" />
          Sort
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-px">
              <span className="sr-only">Farmer</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Commodities</TableHead>
            <TableHead>Aggregator</TableHead>
            <TableHead>Date registered</TableHead>
            <TableHead>Last deposit</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="w-px">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FARMERS_LIST_ROWS.map((farmer) => (
            <FarmersTableRow key={farmer.id} farmer={farmer} />
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

export { FarmersPage };
