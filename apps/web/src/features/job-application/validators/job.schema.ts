import { z } from "zod";

const createJobApplicationSchema = z.object({
  jobUrl: z
    .string("Job URL is required")
    .min(1, "Job URL is required")
    .url("Enter a valid URL"),
  jdText: z
    .string("Job description is required")
    .min(50, "Paste more of the job description — at least 50 characters"),
});

export type createJobApplicationSchemaType = z.infer<
  typeof createJobApplicationSchema
>;
export { createJobApplicationSchema };
