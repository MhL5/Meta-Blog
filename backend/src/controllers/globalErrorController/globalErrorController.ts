import { AppError } from "../../utils/appError";
import { env } from "../../utils/env";
import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import { Error as mongooseError, CastError } from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import * as errorHandler from "./errorHandlers";

type OperationalError = {
  statusCode: number;
  status: string;
  message: string;
  isOperational: boolean;
};

/**
 * Checks if the given error is an operational error.
 *
 * @param err - The error to be checked.
 * @returns The operational error object if the error is operational, otherwise null.
 */
export function isOperationalError(err: unknown): err is OperationalError {
  if (
    typeof err === "object" &&
    err !== null &&
    "isOperational" in err &&
    (err as OperationalError).isOperational
  )
    return true;

  return false;
}

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
     */

    let errCopy = null;
    if (typeof err === "object") errCopy = { ...err };
    // TODO: Test this and if it works refactor the code
    // ? experiment: need to be tested to ensure that this method works
    // if (typeof err === "object") errCopy = structuredClone(err);;

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

function sendErrorForDev(err: AppError, req: Request, res: Response) {
  const { statusCode, status, message, stack } = err;
  
  res.status(statusCode || 500).json({
    status: status || "fail",
    error: err || "unknown error",
    message: message || "something went very wrong!",
    stack: stack || "🤔",
  });
}

function sendErrorProduction(err: unknown, req: Request, res: Response) {
  // Operational trusted error: send message to the client
  if (isOperationalError(err)) {
    return res.status(err?.statusCode || 500).json({
      status: err?.status || "error",
      message: err?.message || "something went wrong",
    });
  }

  // Programming or other unknown error: don't leak error details
  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong! internal Error",
  });
}

export default globalErrorController;
