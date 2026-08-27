"use server";

import { getApplicationsExtractionStatus } from "@/features/job-application/queries/job-application.query";
import { actionHandler } from "@/lib/api/ActionHandler";
import { createApiResponse } from "@/lib/api/ApiResponse";

const getExtractionStatus = actionHandler(async (applicationIds: string[]) => {
  const results = await getApplicationsExtractionStatus(applicationIds);
  return createApiResponse(200, "OK", results);
});

export { getExtractionStatus };
