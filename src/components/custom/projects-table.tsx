"use client";

import {
  faCheck,
  faEllipsis,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PriorityConfig, Project, StatusConfig } from "../config";
import type { ProjectAction } from "../page";
import { PROJECT_ACTIONS } from "../page";

interface ProjectsTableProps {
  projects: Project[];
  selectedRows: Set<string>;
  setSelectedRows: (selected: Set<string>) => void;
  onAction: (action: ProjectAction, projectId?: string) => void;
}

function ProjectsTable({
  projects,
  selectedRows,
  setSelectedRows,
  onAction,
}: ProjectsTableProps) {
  const isAllSelected =
    selectedRows.size === projects.length && projects.length > 0;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(projects.map((p) => p.projectId)));
    }
  };

  const toggleRow = (projectId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(projectId)) {
      newSelected.delete(projectId);
    } else {
      newSelected.add(projectId);
    }
    setSelectedRows(newSelected);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox checked={isAllSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Project ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="invisible">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.projectId}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(project.projectId)}
                  onCheckedChange={() => toggleRow(project.projectId)}
                />
              </TableCell>
              <TableCell>{project.projectId}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon
                    className={`size-4 ${PriorityConfig[project.priority].color}`}
                    icon={PriorityConfig[project.priority].icon}
                  />
                  {PriorityConfig[project.priority].label}
                </div>
              </TableCell>
              <TableCell>{project.assignee}</TableCell>
              <TableCell>{formatDate(project.dueDate)}</TableCell>
              <TableCell>
                <Badge variant={StatusConfig[project.status].variant}>
                  {StatusConfig[project.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                <Progress value={project.progress} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit project"
                      >
                        <Icon icon={faPen} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit project</TooltipContent>
                  </Tooltip>
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="More options"
                          >
                            <Icon icon={faEllipsis} />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>More options</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          onAction(
                            PROJECT_ACTIONS.MARK_AS_DONE,
                            project.projectId,
                          )
                        }
                      >
                        <Icon icon={faCheck} />
                        Mark as done
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() =>
                          onAction(PROJECT_ACTIONS.DELETE, project.projectId)
                        }
                      >
                        <Icon icon={faTrashCan} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { ProjectsTable };
