import { NextFunction, Request, Response } from "express";

type Fn = (
  req?: Request,
  res?: Response,
  next?: NextFunction
) => Promise<unknown>;

/**
 * A higher-order function that wraps an asynchronous function with error handling.
 * this functions aims to replace the need of writing try catch blocks everywhere
 *
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} - A middleware function that handles errors and passes control to the express error controller middleware
 *
 * @example
 * catchAsync(async (req, res, next) => {
 *   await doSomething();
 * });
 */
export default function catchAsync(fn: Fn) {
  return (req?: Request, res?: Response, next?: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
