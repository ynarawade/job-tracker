import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse, type ApiResponse } from "@/lib/api/ApiResponse";

type ActionFn<Args extends unknown[], T> = (
  ...args: Args
) => Promise<ApiResponse<T>>;

function actionHandler<Args extends unknown[], T>(
  fn: ActionFn<Args, T>
): (...args: Args) => Promise<ApiResponse<T>> {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof ApiError) {
        return createApiResponse<T>(
          err.statusCode,
          err.message,
          null,
          err.errors
        );
      }

      console.error("[actionHandler] Unexpected error:", err);

      return createApiResponse<T>(
        500,
        "Something went wrong. Please try again."
      );
    }
  };
}

export { actionHandler };
