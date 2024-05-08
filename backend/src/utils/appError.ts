class AppError extends Error {
  statusCode: number;
  status: "fail" | "Error";
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "Error";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
