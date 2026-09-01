"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditDetailsDialog from "@/features/job-application/components/application-details/EditDetailsDialog";
import { ApplicationStatusSelect } from "@/features/job-application/components/ApplicationStatusSelect";
import { formatSalary } from "@/features/job-application/formatter";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApplicationDetailHeader({
  application,
}: {
  application: JobApplicationListItem;
}) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <div className="space-y-4 border-b border-border pb-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground pl-0 -ml-2 h-8 text-xs"
            onClick={() => router.back()}
          >
            {/* <Link href="/dashboard" prefetch={true}> */}
            <ArrowLeftIcon className="h-4 w-4" />
            Back to applications
            {/* </Link> */}
          </Button>

          <div className="flex items-center gap-2">
            {application.job_url && (
              <a
                href={application.job_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-9 text-xs"
                >
                  <ExternalLinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  Original Listing
                </Button>
              </a>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground/70 hover:text-foreground"
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onSelect={() => setIsEditOpen(true)}
                >
                  <PencilIcon className="h-3.5 w-3.5" /> Edit details
                </DropdownMenuItem>
                {application.contact_mail && (
                  <DropdownMenuItem className="gap-2">
                    <MailIcon className="h-3.5 w-3.5" /> Send follow-up
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive gap-2">
                  <Trash2Icon className="h-3.5 w-3.5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Title & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-semibold text-2xl text-foreground tracking-tight">
                {application.job_title || "Untitled role"}
              </h1>
              <ApplicationStatusSelect
                applicationId={application.id}
                status={application.status!}
              />
            </div>

            {/* Sub-meta matching dashboard typography */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap pt-0.5">
              <span className="font-medium text-muted-foreground/90">
                {application.company || "Unknown company"}
              </span>
              <span className="text-[10px] text-muted-foreground/40">•</span>
              <span className="text-muted-foreground/70">
                {application.platform || "—"}
              </span>

              {application.location && (
                <>
                  <span className="text-[10px] text-muted-foreground/40">
                    •
                  </span>
                  <div className="flex items-center gap-1 text-foreground">
                    <MapPinIcon className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                    <span>{application.location}</span>
                    {application.location_type && (
                      <span className="text-[10px] text-muted-foreground/70 font-mono tracking-wider ml-1">
                        ({application.location_type})
                      </span>
                    )}
                  </div>
                </>
              )}

              {(application.salary_min || application.salary_max) && (
                <>
                  <span className="text-[10px] text-muted-foreground/40">
                    •
                  </span>
                  <span className="font-mono font-medium text-foreground/90">
                    {formatSalary(
                      application.salary_min,
                      application.salary_max,
                      application.salary_currency
                    )}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <EditDetailsDialog
        application={application}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
