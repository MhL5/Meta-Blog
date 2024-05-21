import { AppError } from "../../utils/appError";
import { env } from "../../utils/env";
import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import { Error as mongooseError, CastError } from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import * as errorHandler from "./errorHandlers";
import { cloneError } from "../../utils/deepCloneObj";

type OperationalError = {
  statusCode: number;
  status: string;
  message: string;
  isOperational: boolean;
};

/**
 * @typeGuard
 *  if the given error is an operational error.
 */
export function isOperationalError(err: unknown): err is OperationalError {
  return (
    typeof err === "object" &&
    err !== null &&
    "isOperational" in err &&
    (err as OperationalError).isOperational
  );
}

/**
 * Handles global errors in the application based on the environment.
 * If the environment is in development mode, it sends detailed error information to the client.
 * If the environment is in production mode, it handles specific types of errors and sends a generic error message to the client.
 */
function globalErrorController(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // development environment errors
  if (env.NODE_ENV.toLowerCase() === "development") {
    sendErrorForDev(err as AppError, req, res);
    return;
  }

  // production environment errors
  if (env.NODE_ENV.toLowerCase() === "production") {
    /**
     * * WARNING:
     * TODO:
     * err might contain Non-enumerable properties
     * this means we can't copy all of its properties
     * this can cause un expected behaviors since errCopy doesn't include Non-enumerable properties
     * a workaround is to use err in our if statement instead of our errCopy
     * 
     * @note i prefer to use err even though im using deep clone its safer
     */

    let errCopy = err;
    if (err instanceof Error) errCopy = cloneError(err);

    // invalidId DB error:
    if ((err as CastError)?.name === "CastError")
      errCopy = errorHandler.handleCastErrorDB(errCopy as CastError);

    // duplicate fields DB error:
    if ((err as MongoError)?.code === 11_000)
      errCopy = errorHandler.handleDuplicateFieldDB(errCopy as MongoError);

    // Validation DB error:
    if ((err as mongooseError.ValidationError)?.name === "ValidationError")
      errCopy = errorHandler.handleValidationErrorDB(
        errCopy as mongooseError.ValidationError
      );

    // Auth jwt token error:
    if ((err as JsonWebTokenError)?.name === "JsonWebTokenError")
      errCopy = errorHandler.handleJwtTokenError();

    // Auth jwt token expired:
    if ((err as TokenExpiredError)?.name === "TokenExpiredError")
      errCopy = errorHandler.handleJwtExpiredError();

    sendErrorProduction(errCopy, req, res);
  }
}

/**
 * Sends error response in development environment.
 */
function sendErrorForDev(err: AppError, req: Request, res: Response) {
  const { statusCode, status, message, stack } = err;

  res.status(statusCode || 500).json({
    status: status || "fail",
    error: err || "unknown error",
    message: message || "something went very wrong!",
    stack: stack || "🤔",
  });
}

/**
 * Sends an error response to the client in a production environment.
 * * If the error is an operational error, it sends the error message to the client with the corresponding status code.
 * * If the error is a programming or unknown error, it sends a generic error message with a status code of 500.
 */
function sendErrorProduction(err: unknown, req: Request, res: Response) {
  // Operational trusted error: send message to the client
  if (isOperationalError(err)) {
    return res.status(err?.statusCode || 500).json({
      status: err?.status || "error",
      message: err?.message || "something went wrong",
    });
  }

  // Programming or other unknown error: don't leak error details
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong! internal Error",
  });
}

export default globalErrorController;
