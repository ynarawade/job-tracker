"use server";

import { getCurrentUserId } from "@/features/auth/services/token.service";
import {
  getJobApplicationById,
  getJobApplications,
} from "@/features/job-application/queries/job-application.query";

export async function getApplicationsAction() {
  const userId = await getCurrentUserId();
  return getJobApplications(userId);
}

export async function getApplicationByIdAction(id: string) {
  const userId = await getCurrentUserId();
  return getJobApplicationById(userId, id);
}
