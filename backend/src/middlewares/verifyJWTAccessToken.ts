import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { catchAsyncMiddleware } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

type DecodedAccessToken = {
  UserInfo: { email: string; roles: string };
  iat: number;
  exp: number;
};
function isDecodedAccessToken(
  token: string | jwt.JwtPayload | undefined
): token is DecodedAccessToken {
  return !!(token as DecodedAccessToken)?.UserInfo;
}

/**
 * Verify JWT token and set user information in response locals.
 * after verification this middle will add `(user & roles)` properties to `res.locals`
 * ### important ⚠️⚠️⚠️
 * frontend code only hit the refresh route if it receives `403` so we should only send `403` error status codes from this middleware
 * do not change the error status code
 */
const verifyJWTAccessToken = catchAsyncMiddleware(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== "string")
    return next(new AppError("Bad request", 403));

  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError("Bad request", 403));

  const accessToken = authHeader.split(" ")[1] || "";

  jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    /**
     * ⚠️ frontend code relies on this 403 error status code ⚠️
     * ⚠️ do not change this without updating frontend axios interceptors ⚠️
     */
    if (err) return next(new AppError("invalid", 403));

    if (!isDecodedAccessToken(decoded))
      return next(new AppError("invalid", 500));

    res.locals.user = decoded.UserInfo.email;
    res.locals.roles = decoded.UserInfo.roles;

    next();
  });
});

export { verifyJWTAccessToken };
