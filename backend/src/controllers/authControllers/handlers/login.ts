import { catchAsyncMiddleware } from "../../../utils/catchAsync";
import { AppError } from "../../../utils/appError";
import { UserModel } from "../../../model/userModel";
import authUtils from "../utils/authUtils";

/**
 * Handles user login process.
 * @steps
 * 1. username and password exist in req.body?
 * 2. user exist and password match?
 * 3. Account status active or inactive?
 * 4. if everything ok send the data
 */
const handleLogin = catchAsyncMiddleware(async (req, res, next) => {
  const cookies = req.cookies;
  // 1. username and password exist?
  const { password, email } = req.body;
  if (!password || !email)
    return next(new AppError("Password and email are required", 403));

  // 2. if user exist and password match
  const user = await UserModel.findOne({ email }).select("+password +active");
  if (!user || !(await user?.correctPassword(password, user?.password)))
    return next(new AppError("incorrect email or password", 400));

  // 3. Account status
  // a. email verification: it emailVerificationToken is not undefined this means email is not verified yet
  if (user.emailVerificationToken)
    return next(new AppError("Please verify your email and try again", 403));
  // b. Account active:
  if (!user.active)
    return next(
      new AppError(
        "Your account is inactivated, contact our customer support at sapumr@gmail.com for more information.",
        403
      )
    );

  // 4. if everything ok send the data
  // create jwt
  const accessToken = authUtils.generateAccessToken({ res, user });
  const newRefreshToken = authUtils.generateRefreshToken({ res, user });

  // Changed to let keyword
  let newRefreshTokenArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);

  /**
   * Scenario added here:
   * 1. User logs in but never uses RT and does not logout
   * 2. RT is stolen
   * 3. If 1 & 2, reuse detection is needed to clear all RTs when user logs in
   */
  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundToken = await UserModel.findOne({ refreshToken }).exec();

    /**
     * Detected refresh token reuse!
     * clear out ALL previous refresh tokens
     */
    if (!foundToken) newRefreshTokenArray = [];
    authUtils.cookieCleaner({ res });
  }

  // Saving refreshToken with current user
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await user.save();

  // Creates Secure Cookie with refresh token and removes unwanted fields like password
  authUtils.setAuthCookiesAndRespond({
    res,
    user,
    newRefreshToken,
    accessToken,
  });
});

export default handleLogin;
