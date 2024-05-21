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
 * ### important
 *  after verification this middle will add `(user & roles)` properties to `res.locals`
 */
const verifyJWT = catchAsyncMiddleware(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== "string")
    return next(new AppError("Bad request", 400));

  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError("Bad request", 400));
  const accessToken = authHeader.split(" ")[1] || "";

  jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new AppError("invalid", 400)); //invalid token

    if (!isDecodedAccessToken(decoded))
      return next(new AppError("invalid", 500));

    // !WARNING THIS REQUIRES TEST
    // req.user = decodedToken.UserInfo.email;
    // req.roles = decodedToken.UserInfo.roles;
    res.locals.user = decoded.UserInfo.email;
    res.locals.roles = decoded.UserInfo.roles;

    next();
  });
});

export { verifyJWT };
