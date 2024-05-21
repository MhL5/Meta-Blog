import { UserModel } from "../../model/userModel";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";
import { catchAsyncMiddleware } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import {
  cookieCleaner,
  generateAccessToken,
  generateRefreshToken,
  setAuthCookiesAndRespond,
} from "./utils/generateAuthTokens";

const handleRefreshToken = catchAsyncMiddleware(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return next(new AppError("Un authorized, no cookie available 1️⃣", 401));

  // clear cookie
  const refreshToken = cookies.jwt;

  cookieCleaner({ res });

  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  // token exist but user don't
  if (!foundUser) {
    // @ts-expect-error temp solution
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return next(new AppError("Forbidden jwt not valid 2️⃣", 403));

      const hackedUser = await UserModel.findOne({
        email: decoded?.email,
      }).exec();

      if (hackedUser) hackedUser.refreshToken = [];
      await hackedUser?.save();
    });

    return next(new AppError("Forbidden no user 3️⃣", 403)); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET,
    // @ts-expect-error temp solution
    async (err: unknown, decoded) => {
      // expired refresh token
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }

      if (err || foundUser.email !== decoded?.email)
        return next(new AppError("Forbidden emails are not working 4️⃣", 403));

      // Refresh token was still valid
      const accessToken = generateAccessToken({ res, user: foundUser });
      const newRefreshToken = generateRefreshToken({ res, user: foundUser });

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      setAuthCookiesAndRespond({
        res,
        user: foundUser,
        newRefreshToken,
        accessToken,
      });
    }
  );
});

export { handleRefreshToken };
