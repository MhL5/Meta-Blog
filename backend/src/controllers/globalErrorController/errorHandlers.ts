import { MongoError } from "mongodb";
import { Error as mongooseError, CastError } from "mongoose";
import { AppError } from "../../utils/appError";

/**
 * ⚠️ frontend code relies on this 403 error status code for refresh token implementations ⚠️
 * ⚠️ do not change this without updating frontend axios interceptors ⚠️
 *
 * Returns an AppError instance with a message indicating that the login session has expired
 * and a status code of 403.
 */
export function handleJwtExpiredError() {
  return new AppError(
    "your login session has expired, please login again.",
    403
  );
}

/**
 * ⚠️ frontend code relies on this 403 error status code for refresh token implementations ⚠️
 * ⚠️ do not change this without updating frontend axios interceptors ⚠️
 *
 * Returns an AppError instance with a message "Invalid token! please login again." and a status code of 403.
 */
export function handleJwtTokenError() {
  return new AppError("Invalid token! please login again.", 403);
}

/**
 * Handle cast error from Mongoose when converting a value to a different type.
 * returns An instance of AppError with a 400 status code indicating a client-side error.
 */
export function handleCastErrorDB(err: CastError) {
  const message = `invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

/**
 * Handles validation errors from Mongoose.
 * returns  A new instance of AppError with a message describing the invalid input data and a status code of 400.
 */
export function handleValidationErrorDB(err: mongooseError.ValidationError) {
  const errors = Object.values(err.errors).map((obj) => obj.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
}

/**
 * Handle duplicate field error from MongoDB.
 * returns An instance of AppError with a custom message and status code 400.
 */
export function handleDuplicateFieldDB(err: MongoError) {
  const message = `Duplicate field value: ${JSON.stringify(
    // TODO:
    // @ts-expect-error err.keyValue exist this line requires more investigation type is not correct probably
    err?.keyValue || err.errmsg
  )}. please try another value!`;

  return new AppError(message, 400);
}
