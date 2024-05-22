import { UserModel } from "../../../model/userModel";
import jwt from "jsonwebtoken";
import { env } from "../../../utils/env";
import { catchAsyncMiddleware } from "../../../utils/catchAsync";
import { AppError } from "../../../utils/appError";
import authUtils from "../utils/authUtils";

type DecodedRefreshToken = { email: string };
function isDecodedRefreshToken(
  decoded: string | jwt.JwtPayload | undefined
): decoded is DecodedRefreshToken {
  return !!(decoded as DecodedRefreshToken)?.email;
}

/**
 * Handles the refresh token process
 * @implements
 * - refresh token rotation
 * - reuse detection
 */
const handleRefreshToken = catchAsyncMiddleware(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(new AppError("Unauthorized", 401));

  // clear cookie
  const refreshToken = cookies.jwt;

  authUtils.cookieCleaner({ res });

  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
      {},
      async (err, decoded) => {
        if (err) return next(new AppError("Forbidden", 403));

        if (!isDecodedRefreshToken(decoded))
          return next(new AppError("Forbidden", 403));

        const hackedUser = await UserModel.findOne({
          email: decoded?.email,
        }).exec();

        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save();
        }
      }
    );

    return next(new AppError("Forbidden", 403)); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    env.REFRESH_TOKEN_SECRET,
    {},
    async (err, decoded) => {
      // expired refresh token
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }

      const decodedRefreshToken = decoded as DecodedRefreshToken;

      if (foundUser.email !== decodedRefreshToken?.email)
        return next(new AppError("Forbidden", 403));

      // Refresh token was still valid
      const accessToken = authUtils.generateAccessToken({
        res,
        user: foundUser,
      });
      const newRefreshToken = authUtils.generateRefreshToken({
        res,
        user: foundUser,
      });

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      authUtils.setAuthCookiesAndRespond({
        res,
        user: foundUser,
        newRefreshToken,
        accessToken,
      });
    }
  );
});

export default handleRefreshToken;
