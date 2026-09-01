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

const nullableText = () =>
  z.preprocess(
    (val) => (val === "" ? null : val),
    z.string().trim().min(1).nullable()
  );

const editJobApplicationSchema = z
  .object({
    jobTitle: nullableText(),
    company: nullableText(),
    contactMail: z.preprocess(
      (val) => (val === "" ? null : val),
      z.email().nullable()
    ),
    location: nullableText(),
    locationType: z.enum(["REMOTE", "ONSITE", "HYBRID"]).nullable(),
    salaryMin: z.number().nonnegative().max(100_000_000).nullable(),
    salaryMax: z.number().nonnegative().max(100_000_000).nullable(),
    salaryCurrency: z.enum(["INR", "USD", "EUR"]).nullable(),
  })

  .superRefine((data, ctx) => {
    // Minimum salary cannot exceed maximum salary
    if (
      data.salaryMin !== null &&
      data.salaryMax !== null &&
      data.salaryMin > data.salaryMax
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMin"],
        message: "Minimum salary cannot exceed maximum salary",
      });
    }

    // Currency should exist when salary exists
    if (
      (data.salaryMin !== null || data.salaryMax !== null) &&
      data.salaryCurrency === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryCurrency"],
        message: "Salary currency is required when salary is provided",
      });
    }

    // Currency should not exist without salary
    if (
      data.salaryMin === null &&
      data.salaryMax === null &&
      data.salaryCurrency !== null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryCurrency"],
        message: "Salary currency cannot exist without salary",
      });
    }
  });

export type createJobApplicationSchemaType = z.infer<
  typeof createJobApplicationSchema
>;

export type editJobApplicationSchemaInput = z.input<
  typeof editJobApplicationSchema
>;
export type editJobApplicationSchemaType = z.output<
  typeof editJobApplicationSchema
>;
export { createJobApplicationSchema, editJobApplicationSchema };
