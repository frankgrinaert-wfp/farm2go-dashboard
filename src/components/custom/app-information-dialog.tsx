"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AppInformationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function AppInformationDialog({
  open,
  onOpenChange,
}: AppInformationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>App information</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 text-sm">
          <p>Farm2Go</p>
          <p>Version: 2026-04-17T14:56:06.840Z</p>
          <p>2018-2026 &copy; World Food Programme</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AppInformationDialog };
