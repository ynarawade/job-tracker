import { getApplicationByIdAction } from "@/features/job-application/actions/getApplication.action";
import ApplicationDetailScreen from "@/features/job-application/components/application-details/ApplicationDetailScreen";
import { getQueryClient } from "@/lib/getQueryClient";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();
  // const application = await getJobApplicationById(userId, id);
  await queryClient.query({
    queryKey: ["application", id],
    queryFn: () => getApplicationByIdAction(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApplicationDetailScreen id={id} />
    </HydrationBoundary>
  );
}
