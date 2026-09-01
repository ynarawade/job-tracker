"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteJobApplication } from "@/features/job-application/actions/deleteApplication.action";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteJobApplicationDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  applicationId: string;
  onDeleted?(): void;
}

function DeleteJobApplicationDialog({
  open,
  onOpenChange,
  applicationId,
  onDeleted,
}: DeleteJobApplicationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    const response = await deleteJobApplication(applicationId);
    setIsDeleting(false);

    if (response.statusCode >= 400) {
      toast.error(response.message);
      return;
    }

    toast.success("Application deleted");
    onOpenChange(false);
    onDeleted?.();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete job application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this application? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleConfirmDelete}
          >
            {isDeleting && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {isDeleting ? "Deleting..." : "Confirm delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteJobApplicationDialog;
