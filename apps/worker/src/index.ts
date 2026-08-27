import "dotenv/config";

import { prisma } from "@repo/db";
import { JD_EXTRACTION_QUEUE_NAME } from "@repo/queue/constants";
import type { JdExtractionJobData } from "@repo/queue/types";
import { bullmqConnection } from "@repo/redis";
import { Worker, type Job } from "bullmq";
import { processJdExtraction } from "./processor/jd-extraction.js";

const jobExtractionWorker = new Worker(
  JD_EXTRACTION_QUEUE_NAME,
  processJdExtraction,
  {
    connection: bullmqConnection,
    concurrency: 5,
  }
);

jobExtractionWorker.on("completed", (job) => {
  console.log(`[jd-extraction] completed: ${job.id}`);
});

jobExtractionWorker.on(
  "failed",
  async (job: Job<JdExtractionJobData> | undefined, error: Error) => {
    console.error(`[jd-extraction] attempt failed:`, error);

    if (!job) return;

    const attemptsExhausted = job.attemptsMade >= (job.opts.attempts ?? 1);
    if (!attemptsExhausted) return; // BullMQ will retry — don't touch the row yet

    try {
      await prisma.jobApplication.update({
        where: { id: job.data.applicationId },
        data: { extraction_state: "FAILED" },
      });
    } catch (dbErr) {
      console.error(
        `[jd-extraction] failed to mark ${job.data.applicationId} as FAILED after exhausting retries:`,
        dbErr
      );
    }
  }
);

process.on("SIGTERM", async () => {
  console.log("[worker] SIGTERM received, closing gracefully...");
  await jobExtractionWorker.close();
  process.exit(0);
});
