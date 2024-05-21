/**
 * Custom error class for creating errors to be sent to the Express error handler middleware. 
 * @example 
 * return next(new AppError("this will be sent to express error handler",statusCode));
 * return next(new AppError("username or password is not valid",400));
 */
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
