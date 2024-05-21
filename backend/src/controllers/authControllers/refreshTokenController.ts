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

type DecodedRefreshToken = { email: string };
function isDecodedRefreshToken(
  decoded: string | jwt.JwtPayload | undefined
): decoded is DecodedRefreshToken {
  return !!(decoded as DecodedRefreshToken)?.email;
}

const handleRefreshToken = catchAsyncMiddleware(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(new AppError("Unauthorized", 401));

  // clear cookie
  const refreshToken = cookies.jwt;

  cookieCleaner({ res });

  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  // token exist but user don't
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
