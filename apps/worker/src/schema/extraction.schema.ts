import { z } from "zod";

const extractionSchema = z
  .object({
    jobTitle: z.string().trim().min(1, "Job title must exist").nullable(),
    company: z.string().trim().min(1).nullable(),
    contactMail: z.email().nullable(),
    location: z.string().trim().min(1).nullable(),
    locationType: z.enum(["REMOTE", "ONSITE", "HYBRID"]).nullable(),
    salaryMin: z.number().nonnegative().max(100_000_000).nullable(),
    salaryMax: z.number().nonnegative().max(100_000_000).nullable(),
    salaryCurrency: z.enum(["INR", "USD", "EUR"]).nullable(),
    skills: z.array(z.string().trim().min(1)).max(50),
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

const extractionJsonSchema = z.toJSONSchema(extractionSchema);

export { extractionJsonSchema, extractionSchema };
