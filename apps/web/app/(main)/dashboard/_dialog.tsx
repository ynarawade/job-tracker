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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { addApplication } from "./_actions";

function AddApplicationDialog() {
  async function onSubmit() {
    await addApplication("123", "hello this is jd text");

    console.log("Job added in queue");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 shadow-xs h-9">
          <PlusIcon className="h-4 w-4" />
          Add application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            toast.success("Form submitted");
          }}
        >
          <DialogHeader>
            <DialogTitle>Add job application</DialogTitle>
            <DialogDescription>
              Paste the Job posting URL & JD then wait for magic.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="job-url">Job posting URL</Label>
              <Input id="job-url" name="job-url" placeholder="https://..." />
            </Field>
            <Field>
              <Label htmlFor="jd-text">Job Description</Label>
              <Textarea
                id="jd-text"
                name="jd_text"
                rows={5}
                placeholder="We are seeking a talented and motivated..."
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationDialog;
