import { Check, Search, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ProjectForm } from "@/components/project-form";
import { ProjectsTable } from "@/components/projects-table";
import type { Project, ProjectStatus } from "./config";
import projectsDataJson from "../projects.json";

export const PROJECT_ACTIONS = {
  DELETE: "delete",
  MARK_AS_DONE: "markAsDone",
} as const;

export type ProjectAction =
  (typeof PROJECT_ACTIONS)[keyof typeof PROJECT_ACTIONS];

function MainPage() {
  const [projects, setProjects] = useState<Project[]>(
    projectsDataJson as Project[],
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<ProjectAction>(
    PROJECT_ACTIONS.DELETE,
  );
  const [actionTargets, setActionTargets] = useState<Set<string>>(new Set());

  const handleDelete = () => {
    setProjects((prev) => prev.filter((p) => !actionTargets.has(p.projectId)));
    setSelectedRows(new Set());
    setDialogOpen(false);
  };

  const handleMarkAsDone = () => {
    setProjects((prev) =>
      prev.map((p) =>
        actionTargets.has(p.projectId)
          ? { ...p, status: "COMPLETED" as ProjectStatus, progress: 100 }
          : p,
      ),
    );
    setSelectedRows(new Set());
    setDialogOpen(false);
  };

  const openDialog = (type: ProjectAction, projectId?: string) => {
    if (projectId) {
      setActionTargets(new Set([projectId]));
    } else {
      setActionTargets(new Set(selectedRows));
    }
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleAddProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <>
      <main className="mx-auto flex flex-col gap-6 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl sm:text-3xl">Projects</h1>
            <p className="text-muted-foreground text-sm">
              Manage and track all your projects in one place
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {selectedRows.size > 0 ? (
              <>
                <span className="text-muted-foreground text-sm">
                  {selectedRows.size} selected
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="success-outline"
                    onClick={() => openDialog(PROJECT_ACTIONS.MARK_AS_DONE)}
                  >
                    <Check />
                    Mark as done
                  </Button>
                  <Button
                    variant="destructive-outline"
                    onClick={() => openDialog(PROJECT_ACTIONS.DELETE)}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="secondary">
                  <Upload />
                  Import projects
                </Button>
                <ProjectForm onAddProject={handleAddProject} />
              </div>
            )}
          </div>
        </div>
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <ProjectsTable
          projects={projects}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onAction={openDialog}
        />
      </main>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === PROJECT_ACTIONS.DELETE
                ? "Delete projects"
                : "Mark projects as done"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === PROJECT_ACTIONS.DELETE
                ? `Are you sure you want to delete ${actionTargets.size} ${actionTargets.size === 1 ? "project" : "projects"}? This action cannot be undone.`
                : `Are you sure you want to mark ${actionTargets.size} ${actionTargets.size === 1 ? "project" : "projects"} as done?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                dialogType === PROJECT_ACTIONS.DELETE
                  ? handleDelete
                  : handleMarkAsDone
              }
              className={
                dialogType === PROJECT_ACTIONS.DELETE
                  ? "bg-destructive hover:bg-destructive/90"
                  : ""
              }
            >
              {dialogType === PROJECT_ACTIONS.DELETE
                ? "Delete"
                : "Mark as done"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { MainPage };
