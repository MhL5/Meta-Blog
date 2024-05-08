import { MongoError } from "mongodb";
import { AppError } from "../../utils/appError";
import { Error as mongooseError, CastError } from "mongoose";

export function handleJwtExpiredError() {
  return new AppError(
    "your login session has expired, please login again.",
    401
  );
}

export function handleJwtTokenError() {
  return new AppError("Invalid token! please login again.", 401);
}

export function handleCastErrorDB(err: CastError) {
  const message = `invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

export function handleValidationErrorDB(err: mongooseError.ValidationError) {
  const errors = Object.values(err.errors).map((obj) => obj.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
}

export function handleDuplicateFieldDB(err: MongoError) {
  const message = `Duplicate field value: ${JSON.stringify(
    // TODO:
    // @ts-expect-error err.keyValue exist this line requires more investigation type is not correct probably
    err?.keyValue || err.errmsg
  )}. please try another value!`;

  return new AppError(message, 400);
}
