"use server";

import { getCurrentUserId } from "@/features/auth/services/token.service";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

const deleteJobApplication = actionHandler(async (applicationId: string) => {
  if (!applicationId) {
    throw new ApiError(400, "Application id is required");
  }

  const userId = await getCurrentUserId();

  const result = await prisma.jobApplication.deleteMany({
    where: { id: applicationId, user_id: userId },
  });

  if (result.count === 0) {
    throw new ApiError(404, "Application not found");
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/application/${applicationId}`);

  return createApiResponse(200, "Application deleted");
});

export { deleteJobApplication };
