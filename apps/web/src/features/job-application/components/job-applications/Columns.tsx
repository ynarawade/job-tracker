// features/job-application/components/ApplicationTableColumns.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplicationStatusSelect } from "@/features/job-application/components/ApplicationStatusSelect";
import DeleteJobApplicationDialog from "@/features/job-application/components/DeleteJobApplicationDialog";
import {
  formatApplicationDate,
  formatSalary,
} from "@/features/job-application/formatter";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ExternalLinkIcon,
  FileInput,
  MailIcon,
  MapPinIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function ActionsCell({ app }: { app: JobApplicationListItem }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/applications/${app.id}`}>
              <FileInput className="h-3.5 w-3.5" /> View details
            </Link>
          </DropdownMenuItem>
          {app.contact_mail && (
            <DropdownMenuItem className="gap-2">
              <MailIcon className="h-3.5 w-3.5" /> Send follow-up
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteJobApplicationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        applicationId={app.id}
      />
    </>
  );
}

export const columns: ColumnDef<JobApplicationListItem, unknown>[] = [
  {
    id: "roleCompany",
    accessorKey: "job_title",
    header: "Role & Company",
    enableHiding: false,
    cell: ({ row }) => {
      const app = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-foreground tracking-tight">
              {app.job_title || "Untitled role"}
            </span>

            <a
              href={app.job_url}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground/60 hover:text-primary transition-colors inline-flex items-center"
            >
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-medium text-muted-foreground/90">
              {app.company || "Unknown company"}
            </span>
            <span className="text-[10px] text-muted-foreground/40">•</span>
            <span className="text-muted-foreground/70">
              {app.platform || "—"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ApplicationStatusSelect
        applicationId={row.original.id}
        status={row.original.status!}
      />
    ),
  },
  {
    id: "location",
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const app = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-xs text-foreground">
            <MapPinIcon className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
            <span className="truncate max-w-31.25">
              {app.location || "N/A"}
            </span>
          </div>
          {app.location_type && (
            <span className="text-[10px] text-muted-foreground/70 font-mono tracking-wider pl-4">
              {app.location_type}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "salary",
    accessorKey: "salary_min",
    header: "Salary Range",
    cell: ({ row }) => {
      const app = row.original;
      return (
        <span className="text-xs font-mono font-medium text-foreground/90">
          {formatSalary(app.salary_min, app.salary_max, app.salary_currency)}
        </span>
      );
    },
  },
  {
    id: "skills",
    accessorKey: "skills",
    header: "Tech Stack",
    cell: ({ row }) => {
      const skills = row.original.skills;
      return (
        <div className="flex flex-wrap gap-1 max-w-52.5 items-center">
          {skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 font-normal bg-muted/20 border-border/60 text-muted-foreground shadow-none"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] text-muted-foreground/70 font-mono pl-0.5">
              +{skills.length - 3}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "appliedDate",
    accessorKey: "created_at",
    header: "Applied",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {formatApplicationDate(row.original.created_at)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell app={row.original} />,
  },
];
