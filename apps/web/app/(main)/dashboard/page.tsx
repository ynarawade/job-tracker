import { getCurrentUserId } from "@/features/auth/services/token.service";
import { getApplicationsAction } from "@/features/job-application/actions/getApplication.action";
import DashboardPage from "@/features/job-application/components/DashboardPage";

import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// Replace this with your actual auth helper.

export default async function Dashboard() {
  const userId = await getCurrentUserId();

  const queryClient = getQueryClient();
  await queryClient
    .query({
      queryKey: ["applications", 1],
      queryFn: () => getApplicationsAction(1),
    })
    .catch((rej) => {
      console.log("Prefetch query rejected", rej);
    });

  // console.log("Job applications", applications.length);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage />
    </HydrationBoundary>
  );
}
