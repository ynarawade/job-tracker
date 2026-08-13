export type ApiResponse<T = unknown> = {
  statusCode: number;
  message: string;
  data: T | null;
  success: boolean;
  errors?: {
    field: string;
    message: string;
  }[];
};

export function createApiResponse<T>(
  statusCode: number,
  message: string,
  data: T | null = null,
  errors?: { field: string; message: string }[]
): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
    success: statusCode < 400,
    ...(errors?.length ? { errors } : {}),
  };
}
