"use server";

import { jdExtractionQueue } from "@repo/queue";

export async function addApplication(applicationId: string, jdText: string) {
  const job = await jdExtractionQueue.add("extract", {
    applicationId,
    jdText,
  });
  console.log("Job added in queue", job);
  return { success: true };
}
