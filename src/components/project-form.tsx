"use client";

import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PriorityConfig, StatusConfig } from "@/pages/config";
import type {
  Project,
  ProjectPriority,
  ProjectStatus,
} from "@/pages/config";

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
}

function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    status: "NOT_STARTED" as ProjectStatus,
    priority: "MEDIUM" as ProjectPriority,
    progress: 23,
    assignee: "",
    dueDate: "",
  });

  const generateProjectId = () => {
    return `PRJ-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      projectId: generateProjectId(),
      ...formData,
      dueDate: date ? format(date, "yyyy-MM-dd") : formData.dueDate,
    };

    onAddProject(newProject);
    setOpen(false);
    setDate(undefined);
    setFormData({
      name: "",
      status: "NOT_STARTED",
      priority: "MEDIUM",
      progress: 0,
      assignee: "",
      dueDate: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Add a new project to your workspace. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <Field>
              <FieldLabel htmlFor="name">Project name</FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  value={formData.status}
                  onValueChange={(value: ProjectStatus) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(StatusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="priority">Priority</FieldLabel>
                <Select
                  value={formData.priority}
                  onValueChange={(value: ProjectPriority) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PriorityConfig).map(([key, config]) => {
                      const PriorityIcon = config.icon;
                      return (
                        <SelectItem key={key} value={key}>
                          <PriorityIcon
                            className={config.color}
                            aria-hidden
                          />
                          {config.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="assignee">Assignee</FieldLabel>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="progress">
                Progress ({formData.progress}%)
              </FieldLabel>
              <Slider
                id="progress"
                min={0}
                max={100}
                step={1}
                value={[formData.progress]}
                onValueChange={(value) =>
                  setFormData({ ...formData, progress: value[0] })
                }
              />
              <FieldDescription>
                Set the project completion progress by adjusting the slider
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Due date</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start border-input text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { ProjectForm };
