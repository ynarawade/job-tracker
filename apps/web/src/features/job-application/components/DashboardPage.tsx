"use client";

import { Separator } from "@/components/ui/separator";
import { getApplicationsAction } from "@/features/job-application/actions/getApplication.action";
import AddApplicationDialog from "@/features/job-application/components/AddJobApplicationDialog";
import ApplicationsTable from "@/features/job-application/components/job-applications/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["applications", page],
    queryFn: () => getApplicationsAction(page),
    placeholderData: (previousData) => previousData,
  });

  const applications = data?.applications ?? [];

  const activeCount = applications.filter(
    (application) =>
      application.status === "APPLIED" ||
      application.status === "SCREENING" ||
      application.status === "INTERVIEW"
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "OFFER"
  ).length;

  const rejectionCount = applications.filter(
    (application) => application.status === "REJECTED"
  ).length;

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto w-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
          Applications
        </h1>

        <AddApplicationDialog />
      </div>

      <div className="flex items-center space-x-6 rounded-lg border bg-card px-4 py-3 text-card-foreground shadow-xs w-fit">
        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-foreground leading-none">
            {activeCount}
          </span>

          <span className="text-[11px] text-muted-foreground mt-1 font-medium">
            Active
          </span>
        </div>

        <Separator orientation="vertical" className="h-7" />

        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-primary leading-none">
            0
          </span>

          <span className="text-[11px] text-primary/90 mt-1 font-semibold">
            Follow-ups
          </span>
        </div>

        <Separator orientation="vertical" className="h-7" />

        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-foreground leading-none">
            {offerCount}
          </span>

          <span className="text-[11px] text-muted-foreground mt-1 font-medium">
            Offers
          </span>
        </div>

        <Separator orientation="vertical" className="h-7" />

        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-destructive leading-none">
            {rejectionCount}
          </span>

          <span className="text-[11px] text-destructive mt-1 font-medium">
            Rejections
          </span>
        </div>
      </div>

      <ApplicationsTable
        applications={applications}
        pagination={data?.pagination}
        page={page}
        onPageChange={setPage}
        isLoading={isPending}
        isFetching={isFetching}
      />
    </div>
  );
}
