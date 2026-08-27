import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExtractionStateCell } from "@/features/job-application/components/ExtractionStateCell";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { ExternalLinkIcon } from "lucide-react";

type ApplicationRowSkeletonProps = {
  application: JobApplicationListItem;
};

export function ApplicationRowSkeleton({
  application,
}: ApplicationRowSkeletonProps) {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors duration-150">
      {/* Role & Company */}
      <TableCell className="py-3 pl-4 pr-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-40" />

            <a
              href={application.job_url}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground/40 inline-flex items-center"
            >
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
          <Skeleton className="h-3 w-28" />
          <ExtractionStateCell state={application.extraction_state} />
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="py-3 px-2">
        <Skeleton className="h-5 w-16 rounded-full" />
      </TableCell>

      {/* Location */}
      <TableCell className="py-3 px-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </TableCell>

      {/* Salary */}
      <TableCell className="py-3 px-2">
        <Skeleton className="h-3.5 w-24" />
      </TableCell>

      {/* Tech Stack */}
      <TableCell className="py-3 px-2">
        <div className="flex gap-1">
          <Skeleton className="h-4 w-12 rounded-sm" />
          <Skeleton className="h-4 w-14 rounded-sm" />
          <Skeleton className="h-4 w-10 rounded-sm" />
        </div>
      </TableCell>

      {/* Applied */}
      <TableCell className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">
        {new Date(application.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </TableCell>

      {/* Actions */}
      <TableCell className="py-3 pr-3 pl-0 text-right">
        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
      </TableCell>
    </TableRow>
  );
}
