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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJobApplication } from "@/features/job-application/actions/createApplication.action";
import {
  createJobApplicationSchema,
  type createJobApplicationSchemaType,
} from "@/features/job-application/validators/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddApplicationDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createJobApplicationSchemaType>({
    resolver: zodResolver(createJobApplicationSchema),
  });

  async function onSubmit(data: createJobApplicationSchemaType) {
    const response = await createJobApplication(data);

    if (response.statusCode >= 400) {
      toast.error(response.message);
      return;
    }

    toast.success("Application added — extracting details in the background");
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                disabled={isSubmitting}
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
                placeholder="We are seeking a talented and motivated..."
                disabled={isSubmitting}
                {...register("jdText")}
              />
              {errors.jdText && (
                <FieldError className="text-xs text-destructive mt-1">
                  {errors.jdText.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationDialog;
