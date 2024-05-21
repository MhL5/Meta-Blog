import { NextFunction, Request, Response } from "express";

type Fn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * A higher-order function that wraps an asynchronous express middleware functions with error handling.
 * this functions aims to replace the need of writing try catch blocks for express async middlewares
 *
 * @example
 * catchAsyncMiddleware(async (req, res, next) => {
 *   await doSomething();
 * });
 */
export function catchAsyncMiddleware(fn: Fn) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
