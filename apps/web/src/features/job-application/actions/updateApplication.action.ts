"use server";

import { getCurrentUserId } from "@/features/auth/services/token.service";
import type { editJobApplicationSchemaType } from "@/features/job-application/validators/job.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

const updateApplicationStatus = actionHandler(
  async (applicationId: string, status: string) => {
    const userId = await getCurrentUserId();

    const result = await prisma.jobApplication.updateMany({
      where: { id: applicationId, user_id: userId },
      data: { status: status as any }, // narrowed by caller's enum, see note below
    });

    if (result.count === 0) {
      throw new ApiError(404, "Application not found");
    }

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${applicationId}`);

    return createApiResponse(200, "Status updated");
  }
);

const updateJobApplication = actionHandler(
  async (applicationId: string, data: editJobApplicationSchemaType) => {
    const userId = await getCurrentUserId();

    const result = await prisma.jobApplication.updateMany({
      where: { id: applicationId, user_id: userId },
      data: {
        job_title: data.jobTitle,
        company: data.company,
        contact_mail: data.contactMail,
        location: data.location,
        location_type: data.locationType,
        salary_min: data.salaryMin,
        salary_max: data.salaryMax,
        salary_currency: data.salaryCurrency,
      },
    });

    if (result.count === 0) {
      throw new ApiError(404, "Application not found");
    }

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${applicationId}`);

    return createApiResponse(200, "Application updated");
  }
);

export { updateApplicationStatus, updateJobApplication };
