import { JD_EXTRACTION_QUEUE_NAME } from "@repo/queue/constants";
import { bullmqConnection } from "@repo/redis";
import { Job, Worker } from "bullmq";

const jobExtractionWorker = new Worker(
  JD_EXTRACTION_QUEUE_NAME,
  async (job: Job) => {
    console.log(job);
  },
  {
    connection: bullmqConnection,
  }
);

jobExtractionWorker.on("completed", () => {
  console.log("Work completed successfully");
});

jobExtractionWorker.on("failed", (_, error: Error) => {
  console.log("Work failed");
  console.error(error);
});
