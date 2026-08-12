import { ApiError } from "@/lib/api/ApiError";
import { ZodType } from "zod";

export const validate = <T>(schema: ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError(
      400,
      "Validation failed",
      result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }))
    );
  }
  return result.data;
};
