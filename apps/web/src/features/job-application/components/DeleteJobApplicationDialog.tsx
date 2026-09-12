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
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { getQueryClient } from "@/lib/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteJobApplicationDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  applicationId: string;
}

function DeleteJobApplicationDialog({
  open,
  onOpenChange,
  applicationId,
}: DeleteJobApplicationDialogProps) {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await deleteJobApplication(applicationId);
      if (res.statusCode >= 400) {
        throw new Error(res.message ?? "Failed to delete application");
      }
      return res;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previousApplications = queryClient.getQueryData<
        JobApplicationListItem[]
      >(["applications"]);

      queryClient.setQueryData<JobApplicationListItem[]>(
        ["applications"],
        (old) => (old ?? []).filter((a) => a.id !== applicationId)
      );

      onOpenChange(false);

      return { previousApplications };
    },
    onSuccess: () => {
      toast.success("Application deleted");
    },
    onError: (err, _variables, onMutateResult) => {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      queryClient.setQueryData(
        ["applications"],
        onMutateResult?.previousApplications
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

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
            <Button
              variant="outline"
              type="button"
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending && (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            )}
            {mutation.isPending ? "Deleting..." : "Confirm delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteJobApplicationDialog;
