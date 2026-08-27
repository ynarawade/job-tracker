import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ApplicationRowSkeleton } from "@/features/job-application/components/ApplicationRowSkeleton";
import { ApplicationStatusBadge } from "@/features/job-application/components/ApplicationStatusBadge";
import { ExtractionStateCell } from "@/features/job-application/components/ExtractionStateCell";
import {
  formatApplicationDate,
  formatSalary,
} from "@/features/job-application/formatter";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { ExternalLinkIcon, MapPinIcon } from "lucide-react";
type ApplicationRowProps = {
  app: JobApplicationListItem;
};

export function ApplicationRow({ app }: ApplicationRowProps) {
  if (app.extraction_state === "PENDING") {
    return <ApplicationRowSkeleton application={app} />;
  }

  return (
    <TableRow className="hover:bg-muted/20 transition-colors duration-150">
      {/* Role & Company */}
      <TableCell className="py-3 pl-4 pr-2">
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
          <ExtractionStateCell state={app.extraction_state} />
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="py-3 px-2">
        <ApplicationStatusBadge status={app.status} />
      </TableCell>

      {/* Location */}
      <TableCell className="py-3 px-2">
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
      </TableCell>

      {/* Salary Range */}
      <TableCell className="py-3 px-2 text-xs font-mono font-medium text-foreground/90">
        {formatSalary(app.salary_min, app.salary_max, app.salary_currency)}
      </TableCell>

      {/* Tech Stack */}
      <TableCell className="py-3 px-2">
        <div className="flex flex-wrap gap-1 max-w-52.5 items-center">
          {app.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 font-normal bg-muted/20 border-border/60 text-muted-foreground shadow-none"
            >
              {skill}
            </Badge>
          ))}
          {app.skills.length > 3 && (
            <span className="text-[10px] text-muted-foreground/70 font-mono pl-0.5">
              +{app.skills.length - 3}
            </span>
          )}
        </div>
      </TableCell>

      {/* Applied Date */}
      <TableCell className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">
        {formatApplicationDate(app.created_at)}
      </TableCell>

      {/* Actions */}
      <TableCell className="py-3 pr-3 pl-0 text-right">
        {/* <DropdownMenu>
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      {app.contact_mail && (
                        <DropdownMenuItem className="gap-2">
                          <MailIcon className="h-3.5 w-3.5" /> Send follow-up
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
      </TableCell>
    </TableRow>
  );
}

export default ApplicationRow;
