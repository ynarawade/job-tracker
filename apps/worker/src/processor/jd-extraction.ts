import { GEMINI_MODEL, getGeminiClient } from "@repo/ai";
import { prisma } from "@repo/db";
import type { JdExtractionJobData } from "@repo/queue/types";
import type { Job } from "bullmq";
import {
  extractionJsonSchema,
  extractionSchema,
} from "../schema/extraction.schema.js";
import { EXTRACTION_PROMPT } from "../utils/constants.js";

async function markFailed(applicationId: string) {
  try {
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { extraction_state: "FAILED" },
    });
  } catch (err) {
    console.error(
      `[jd-extraction] failed to mark ${applicationId} as FAILED:`,
      err
    );
  }
}

export async function processJdExtraction(job: Job<JdExtractionJobData>) {
  const { applicationId, jdText } = job.data;

  // outer scope — Gemini call errors throw naturally, BullMQ retries
  const client = getGeminiClient();
  const interaction = await client.models.generateContent({
    model: GEMINI_MODEL,
    contents: EXTRACTION_PROMPT.replace("{{JD_TEXT}}", jdText),
    config: {
      responseMimeType: "application/json",
      responseSchema: extractionJsonSchema,
    },
  });

  console.log("Interaction by llm", interaction);

  if (!interaction.text) {
    console.error(`[jd-extraction] empty output for ${applicationId}`);
    await markFailed(applicationId);
    return;
  }

  // inner scope — parse/validate failures are terminal, not retried
  try {
    const parsed = JSON.parse(interaction.text);
    const data = extractionSchema.parse(parsed);

    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        job_title: data.jobTitle,
        company: data.company,
        contact_mail: data.contactMail,
        location: data.location,
        location_type: data.locationType,
        salary_min: data.salaryMin,
        salary_max: data.salaryMax,
        salary_currency: data.salaryCurrency,
        skills: data.skills,
        extraction_state: "COMPLETED",
      },
    });
  } catch (err) {
    console.error(
      `[jd-extraction] validation failed for ${applicationId}:`,
      err
    );
    await markFailed(applicationId);
  }
}
