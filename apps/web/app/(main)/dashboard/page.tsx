import AddApplicationDialog from "@/features/job-application/components/AddJobApplicationDialog";

import { Separator } from "@/components/ui/separator";
import { getCurrentUserId } from "@/features/auth/services/token.service";
import { getApplicationsAction } from "@/features/job-application/actions/getApplication.action";
import ApplicationsTable from "@/features/job-application/components/ApplicationTable";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// Replace this with your actual auth helper.

export default async function Dashboard() {
  const userId = await getCurrentUserId();

  const queryClient = getQueryClient();
  await queryClient
    .query({
      queryKey: ["applications"],
      queryFn: getApplicationsAction,
    })
    .catch((rej) => {
      console.log("Prefetch query rejected", rej);
    });

  // console.log("Job applications", applications.length);

  // const activeCount = applications.filter(
  //   (application) =>
  //     application.status === "APPLIED" ||
  //     application.status === "SCREENING" ||
  //     application.status === "INTERVIEW"
  // ).length;

  // const offerCount = applications.filter(
  //   (application) => application.status === "OFFER"
  // ).length;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
              {/* {activeCount } */}
              10
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
              {/* {offerCount} */}
              100
            </span>

            <span className="text-[11px] text-muted-foreground mt-1 font-medium">
              Offers
            </span>
          </div>
        </div>

        <ApplicationsTable />
      </div>
    </HydrationBoundary>
  );
}
