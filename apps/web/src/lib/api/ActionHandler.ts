import { ApiError } from "@/lib/api/ApiError";
import ApiResponse from "@/lib/api/ApiResponse";

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
        return new ApiResponse<T>(
          err.statusCode,
          err.message,
          null,
          err.errors
        );
      }

      // Unexpected error — log server-side, never leak internals to client
      console.error("[actionHandler] Unexpected error:", err);
      return new ApiResponse<T>(
        500,
        "Something went wrong. Please try again.",
        null
      );
    }
  };
}

export { actionHandler };
