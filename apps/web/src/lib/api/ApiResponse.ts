class ApiResponse<T = unknown> {
  readonly statusCode: number;
  readonly message: string;
  readonly data: T | null;
  readonly success: boolean;
  readonly errors?: { field: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    data: T | null = null,
    errors?: { field: string; message: string }[]
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
    if (errors && errors.length > 0) this.errors = errors;
  }
}

export default ApiResponse;
