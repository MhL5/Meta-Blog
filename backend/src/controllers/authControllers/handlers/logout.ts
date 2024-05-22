import { UserModel } from "../../../model/userModel";
import { AppError } from "../../../utils/appError";
import { catchAsyncMiddleware } from "../../../utils/catchAsync";
import authUtils from "../utils/authUtils";

/**
 * Handles the logout process for a user
 * - removes the user cookies, refresh token
 */
const handleLogout = catchAsyncMiddleware(async (req, res, next) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(new AppError("no content", 204));
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    authUtils.cookieCleaner({ res });
    return next(new AppError("no content", 204));
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  authUtils.cookieCleaner({ res });
  res.status(204).json({ status: "success", message: "logout successful" });
});

export default handleLogout;
