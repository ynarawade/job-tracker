"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateJobApplication } from "@/features/job-application/actions/updateApplication.action";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import {
  editJobApplicationSchema,
  type editJobApplicationSchemaInput,
  type editJobApplicationSchemaType,
} from "@/features/job-application/validators/job.schema";
import { getQueryClient } from "@/lib/getQueryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditDetailsDialogProps {
  application: JobApplicationListItem;
  open: boolean;
  onOpenChange(open: boolean): void;
}

function EditDetailsDialog({
  application,
  open,
  onOpenChange,
}: EditDetailsDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<
    editJobApplicationSchemaInput,
    unknown,
    editJobApplicationSchemaType
  >({
    resolver: zodResolver(editJobApplicationSchema),
    defaultValues: {
      jobTitle: application.job_title ?? "",
      company: application.company ?? "",
      contactMail: application.contact_mail ?? null,
      location: application.location ?? null,
      locationType: application.location_type ?? null,
      salaryMin: application.salary_min ?? null,
      salaryMax: application.salary_max ?? null,
      salaryCurrency: application.salary_currency ?? null,
    },
  });

  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: editJobApplicationSchemaType) => {
      const res = await updateJobApplication(application.id, data);
      if (res.statusCode >= 400) {
        if (res.errors && res.errors.length > 0) {
          res.errors.forEach(({ field, message }) => {
            setError(field as keyof editJobApplicationSchemaType, { message });
          });
          return;
        }
        throw new Error(res.message ?? "Failed to add application");
      }
      return res;
    },
    onMutate: async (data: editJobApplicationSchemaType) => {
      await queryClient.cancelQueries({
        queryKey: ["application", application.id],
      });

      const ogApplication = queryClient.getQueryData<JobApplicationListItem>([
        "application",
        application.id,
      ]);

      const optimisticUpdate: JobApplicationListItem = {
        ...application,
        job_title: data.jobTitle,
        company: data.company,
        location: data.location,
        location_type: data.locationType,
        salary_min: data.salaryMin,
        salary_max: data.salaryMax,
        salary_currency: data.salaryCurrency,
        contact_mail: data.contactMail,
      };

      queryClient.setQueryData<JobApplicationListItem>(
        ["application", application.id],
        (old) => optimisticUpdate
      );

      handleOpenChange(false);

      return { ogApplication };
    },
    onError: (err, _newApplication, onMutateResult) => {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      queryClient.setQueryData(
        ["application", application.id],
        onMutateResult?.ogApplication
      );
    },
    onSuccess: () => {
      toast.success("Application updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["application", application.id],
      });
    },
  });

  async function onSubmit(data: editJobApplicationSchemaType) {
    mutation.mutate(data);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      reset();
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit job application</DialogTitle>
            <DialogDescription>
              Update your application details below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                disabled={isSubmitting}
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <FieldError>{errors.jobTitle.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                disabled={isSubmitting}
                {...register("company")}
              />
              {errors.company && (
                <FieldError>{errors.company.message}</FieldError>
              )}
            </Field>

            <Field>
              <Label htmlFor="contactMail">Contact Email</Label>
              <Input
                id="contactMail"
                type="email"
                disabled={isSubmitting}
                {...register("contactMail")}
              />
              {errors.contactMail && (
                <FieldError>{errors.contactMail.message}</FieldError>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  disabled={isSubmitting}
                  {...register("location")}
                />
                {errors.location && (
                  <FieldError>{errors.location.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label>Location Type</Label>
                <Controller
                  name="locationType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={isSubmitting}
                      value={field.value ?? "NONE"}
                      onValueChange={(val) =>
                        field.onChange(val === "NONE" ? null : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="NONE"
                          className="text-muted-foreground"
                        >
                          Not specified
                        </SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="ONSITE">Onsite</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.locationType && (
                  <FieldError>{errors.locationType.message}</FieldError>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Field>
                <Label htmlFor="salaryMin">Min Salary</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  disabled={isSubmitting}
                  {...register("salaryMin", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                />
                {errors.salaryMin && (
                  <FieldError>{errors.salaryMin.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label htmlFor="salaryMax">Max Salary</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  disabled={isSubmitting}
                  {...register("salaryMax", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                />
                {errors.salaryMax && (
                  <FieldError>{errors.salaryMax.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label>Currency</Label>
                <Controller
                  name="salaryCurrency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={isSubmitting}
                      value={field.value ?? "NONE"}
                      onValueChange={(val) =>
                        field.onChange(val === "NONE" ? null : val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="NONE"
                          className="text-muted-foreground"
                        >
                          Not specified
                        </SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.salaryCurrency && (
                  <FieldError>{errors.salaryCurrency.message}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDetailsDialog;
