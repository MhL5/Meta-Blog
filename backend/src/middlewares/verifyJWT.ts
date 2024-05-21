import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { catchAsyncMiddleware } from "../utils/catchAsync";
import { AppError } from "../utils/appError";

type DecodedToken = {
  UserInfo: { email: string; roles: string };
  iat: number;
  exp: number;
};

/**
 * Verify JWT token and set user information in response locals.
 * ### important
 *  after verification this middle will add `(user & roles)` properties to `res.locals`
 */
const verifyJWT = catchAsyncMiddleware(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== "string")
    return next(new AppError("authHeader is not valid", 400));

  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError("not a valid Bearer token", 400));
  const token = authHeader.split(" ")[1] || "";

  jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(`verifyJWT decoded 17`, decoded);
    if (err) return next(new AppError("invalid access token", 400)); //invalid token

    if (!decoded) return next(new AppError("decoded data is falsy", 500));
    const decodedToken = decoded as DecodedToken;

    // !WARNING THIS REQUIRES TEST
    // req.user = decodedToken.UserInfo.email;
    // req.roles = decodedToken.UserInfo.roles;
    res.locals.user = decodedToken.UserInfo.email;
    res.locals.roles = decodedToken.UserInfo.roles;

    next();
  });
});

export { verifyJWT };
