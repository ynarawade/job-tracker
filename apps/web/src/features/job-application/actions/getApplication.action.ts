"use server";

import { getCurrentUserId } from "@/features/auth/services/token.service";
import { getJobApplications } from "@/features/job-application/queries/job-application.query";

export async function getApplicationsAction() {
  const userId = await getCurrentUserId();
  return getJobApplications(userId);
}
