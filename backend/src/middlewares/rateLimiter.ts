import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  max: 100,
  windowMs: 5 * 60 * 1000,
  message: "too many requests with this id, please try again in 5 minutes.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

export const loginApiLimiter = rateLimit({
  max: 10,
  windowMs: 10 * 60 * 1000,
  message: "too many login requests, please try again in an hour.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
