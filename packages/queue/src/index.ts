import { bullmqConnection } from "@repo/redis";
import { Queue } from "bullmq";
import { JD_EXTRACTION_QUEUE_NAME } from "./constants";
import type { JdExtractionJobData } from "./types";

export const jdExtractionQueue = new Queue<JdExtractionJobData>(
  JD_EXTRACTION_QUEUE_NAME,
  {
    connection: bullmqConnection,
  }
);
