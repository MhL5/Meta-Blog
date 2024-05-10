import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  max: 300,
  windowMs: 5 * 60 * 1000,
  message: "too many requests with this id, please try again in an hour.",
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
