import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExtractionStateCell } from "@/features/job-application/components/ExtractionStateCell";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";

type ApplicationRowSkeletonProps = {
  application: JobApplicationListItem;
  columnIds: string[];
};

const skeletonRenderers: Record<
  string,
  (application: JobApplicationListItem) => ReactNode
> = {
  roleCompany: (application) => (
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
  ),
  status: () => <Skeleton className="h-5 w-16 rounded-full" />,
  location: () => (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-2.5 w-16" />
    </div>
  ),
  salary: () => <Skeleton className="h-3.5 w-24" />,
  skills: () => (
    <div className="flex gap-1">
      <Skeleton className="h-4 w-12 rounded-sm" />
      <Skeleton className="h-4 w-14 rounded-sm" />
      <Skeleton className="h-4 w-10 rounded-sm" />
    </div>
  ),
  appliedDate: (application) =>
    new Date(application.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  actions: () => <Skeleton className="h-8 w-8 rounded-md ml-auto" />,
};

export function ApplicationRowSkeleton({
  application,
  columnIds,
}: ApplicationRowSkeletonProps) {
  return (
    <TableRow className="hover:bg-muted/20 transition-colors duration-150">
      {columnIds.map((id, index) => {
        const isFirst = index === 0;
        const isLast = index === columnIds.length - 1;
        return (
          <TableCell
            key={id}
            className={
              isFirst
                ? "py-3 pl-4 pr-2"
                : isLast
                  ? "py-3 pr-3 pl-0 text-right"
                  : "py-3 px-2 text-xs text-muted-foreground whitespace-nowrap"
            }
          >
            {skeletonRenderers[id]?.(application) ?? null}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
