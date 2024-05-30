import { env } from "../utils/env";
import { catchAsyncMiddleware } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import {
  isDecodedAccessToken,
  jwtVerifyAsync,
} from "../controllers/authControllers/utils/authUtils";
import { UserModel } from "../model/userModel";

const errorMessage = "token invalid or expired, please login in again";

/**
 * Protect middleware
 * Protects resources from unwanted access and sets the foundUser in `res.locals.user`
 */
const protect = catchAsyncMiddleware(async (req, res, next) => {
  /**
   * 1. TOKEN VERIFICATION
   * verify JWT access token
   */

  /**
   * !⚠️ CAN BREAK THE WHOLE FRONTEND AUTHENTICATION
   * !⚠️ Frontend refresh token implementation relies on 403 error status code
   * !⚠️ if you send any other error status code other than 403 it wont send request to refresh access token
   * !⚠️ Don't change the error status code in (1. TOKEN VERIFICATION) unless you update the frontend axios interceptors too
   */
  const REFRESH_TOKEN_ERROR_STATUS_CODE = 403;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  // typescript type guard
  if (typeof authHeader !== "string")
    return next(new AppError(errorMessage, REFRESH_TOKEN_ERROR_STATUS_CODE));

  if (!authHeader?.startsWith("Bearer "))
    return next(new AppError(errorMessage, REFRESH_TOKEN_ERROR_STATUS_CODE));

  const accessToken = authHeader.split(" ")[1] || "";

  const decodedAccessToken = await jwtVerifyAsync(
    accessToken,
    env.ACCESS_TOKEN_SECRET
  );

  if (!isDecodedAccessToken(decodedAccessToken))
    return next(new AppError(errorMessage, REFRESH_TOKEN_ERROR_STATUS_CODE));

  /**
   *  2. Check if user still exist
   *  token might be stolen and it should not work after users removes the account
   */
  const currentUser = await UserModel.findById(
    decodedAccessToken.data?.user?._id || ""
  )
    .select("+active")
    .exec();

  if (!currentUser)
    return next(
      new AppError("This user belonging to this token no longer exist", 401)
    );

  if (!currentUser.active)
    return next(
      new AppError(
        "your account is not active, please check you're email for more details or contact customer support.",
        401
      )
    );

  /**
   * 4. Check if user changes password after token was issued
   * token might be stolen and it should not work after users changes his password
   */
  if (currentUser.changedPasswordAfter(decodedAccessToken.iat))
    return next(
      new AppError("User recently changed password! please login again", 401)
    );

  /**
   * 5. Grant access to protected Route
   * saves the user into `res.locals.user`
   */
  res.locals.user = currentUser.toObject();
  next();
});

export { protect };
