"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJobApplication } from "@/features/job-application/actions/createApplication.action";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";

import {
  createJobApplicationSchema,
  type createJobApplicationSchemaType,
} from "@/features/job-application/validators/job.schema";
import { getQueryClient } from "@/lib/getQueryClient";
import { analyzeJdCompleteness } from "@/lib/utils/analyzeJdCompleteness";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangleIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddApplicationDialog() {
  const [open, setOpen] = useState(false);
  const [incompleteWarning, setIncompleteWarning] = useState<string[] | null>(
    null
  );
  const [hasConfirmedIncomplete, setHasConfirmedIncomplete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createJobApplicationSchemaType>({
    resolver: zodResolver(createJobApplicationSchema),
  });

  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: createJobApplicationSchemaType) => {
      const res = await createJobApplication(data);
      if (res.statusCode >= 400) {
        throw new Error(res.message ?? "Failed to add application");
      }
      return res;
    },
    onMutate: async (newApplication) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previousApplications = queryClient.getQueryData<
        JobApplicationListItem[]
      >(["applications"]);

      const optimisticApp: JobApplicationListItem = {
        id: `optimistic-${crypto.randomUUID()}`,
        job_title: null,
        company: null,
        job_url: newApplication.jobUrl,
        platform: null,
        location: null,
        location_type: null,
        salary_min: null,
        salary_max: null,
        salary_currency: null,
        skills: [],
        status: "APPLIED",
        extraction_state: "PENDING",
        contact_mail: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<JobApplicationListItem[]>(
        ["applications"],
        (old) => [optimisticApp, ...(old ?? [])]
      );

      resetDialogState();
      setOpen(false);

      return { previousApplications };
    },
    onError: (err, _newApplication, onMutateResult) => {
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
    onSuccess: () => {
      toast.success("Application added — extracting details in the background");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  async function onSubmit(data: createJobApplicationSchemaType) {
    if (!hasConfirmedIncomplete) {
      const { isLikelyIncomplete, missingSignals } = analyzeJdCompleteness(
        data.jdText
      );
      if (isLikelyIncomplete) {
        setIncompleteWarning(missingSignals);
        return;
      }
    }

    mutation.mutate(data);
  }

  function resetDialogState() {
    reset();
    setIncompleteWarning(null);
    setHasConfirmedIncomplete(false);
  }

  function handleSubmitAnyway() {
    setHasConfirmedIncomplete(true);
    handleSubmit(onSubmit)();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetDialogState();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 shadow-xs h-9">
          <PlusIcon className="h-4 w-4" />
          Add application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add job application</DialogTitle>
            <DialogDescription>
              Paste the Job posting URL & JD then wait for magic.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="job-url">Job posting URL</Label>
              <Input
                id="job-url"
                placeholder="https://..."
                disabled={mutation.isPending}
                {...register("jobUrl")}
              />
              {errors.jobUrl && (
                <FieldError className="text-xs text-destructive mt-1">
                  {errors.jobUrl.message}
                </FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="jd-text">Paste Job Description</Label>
              <Textarea
                id="jd-text"
                rows={5}
                className="max-h-64 overflow-y-auto resize-none"
                placeholder="We are seeking a talented and motivated..."
                disabled={mutation.isPending}
                {...register("jdText", {
                  onChange: () => {
                    if (incompleteWarning) {
                      setIncompleteWarning(null);
                      setHasConfirmedIncomplete(false);
                    }
                  },
                })}
              />
              {errors.jdText && (
                <FieldError className="text-xs text-destructive mt-1">
                  {errors.jdText.message}
                </FieldError>
              )}
            </Field>

            {incompleteWarning && (
              <Alert className="border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-500">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle className="text-sm">
                  This might not extract everything cleanly
                </AlertTitle>
                <AlertDescription className="text-amber-700/90 dark:text-amber-400/90">
                  <ul className="list-disc pl-4 space-y-0.5">
                    {incompleteWarning.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                  <p className="pt-1.5">
                    Tip: select the entire job page (Ctrl+A / Cmd+A) instead of
                    just the description for better results.
                  </p>
                </AlertDescription>
              </Alert>
            )}
          </FieldGroup>

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
            {incompleteWarning ? (
              <Button
                type="button"
                disabled={mutation.isPending}
                onClick={handleSubmitAnyway}
                className="bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
              >
                {mutation.isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertTriangleIcon className="h-4 w-4" />
                )}
                {mutation.isPending ? "Saving..." : "Submit anyway"}
              </Button>
            ) : (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                )}
                {mutation.isPending ? "Saving..." : "Save Application"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationDialog;
