"use server";

import { createApplicationWithExtraction } from "@/features/job-application/services/jobApplication.service";
import {
  createJobApplicationSchema,
  type createJobApplicationSchemaType,
} from "@/features/job-application/validators/job.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";
import { revalidatePath } from "next/cache";

const createJobApplication = actionHandler(
  async (data: createJobApplicationSchemaType) => {
    // Step 1: Validate incoming data
    const { jdText, jobUrl } = validate(createJobApplicationSchema, data);

    // Step 2: create optimistic row + queue extraction job
    const jobEntry = await createApplicationWithExtraction({ jdText, jobUrl });

    // Step 3: tell Next.js the dashboard's data is stale
    revalidatePath("/dashboard");

    // Step 4: return success response with the created row
    return createApiResponse(200, "Application added successfully", jobEntry);
  }
);

export { createJobApplication };
