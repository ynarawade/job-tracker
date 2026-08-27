"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicationRow from "@/features/job-application/components/ApplicationRow";
import { useJdExtractionPolling } from "@/features/job-application/hooks/useJdExtractionPolling";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";

import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

type ApplicationsTableProps = {
  initialApplications: JobApplicationListItem[];
};

export default function ApplicationsTable({
  initialApplications,
}: ApplicationsTableProps) {
  const applications = useJdExtractionPolling(initialApplications);

  console.log(
    "Applications:",
    applications.length,
    "Pending:",
    applications.filter((app) => app.extraction_state === "PENDING").length
  );
  return (
    <div className="space-y-3 pt-1">
      {/* Cohesive Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, company, or tech..."
            className="pl-8 h-9 text-xs"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 text-xs text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Filters
        </Button>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
              <TableHead className="w-70 py-3 pl-4 pr-2">
                Role & Company
              </TableHead>
              <TableHead className="w-30 py-3 px-2">Status</TableHead>
              <TableHead className="w-37.5 py-3 px-2">Location</TableHead>
              <TableHead className="w-35 py-3 px-2">Salary Range</TableHead>
              <TableHead className="w-55 py-3 px-2">Tech Stack</TableHead>
              <TableHead className="w-25 py-3 px-2">Applied</TableHead>
              <TableHead className="w-12 py-3 pr-3 pl-0 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-sm font-medium">No applications yet</p>

                    <p className="text-xs text-muted-foreground">
                      Add your first application to start tracking your job
                      search.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <ApplicationRow key={app.id} app={app} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
