import { UserModel } from "../../model/userModel";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";

const handleRefreshToken = catchAsync(async (req, res, next) => {
  const cookies = req.cookies;
  console.log(`cookie`, cookies);
  if (!cookies?.jwt) return next(new AppError("Un authorized", 401));
  const refreshToken = cookies.jwt;
  // clear cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  console.log(refreshToken);
  const foundUser = await UserModel.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  // token exist but user don't
  console.log(`user`, foundUser);
  if (!foundUser) {
    // @ts-expect-error temp solution
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return next(new AppError("Forbidden", 403));

      const hackedUser = await UserModel.findOne({
        email: decoded?.email,
      }).exec();

      if (hackedUser) hackedUser.refreshToken = [];
      await hackedUser?.save();
    });

    return next(new AppError("Forbidden no user", 403)); //Forbidden
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
        // console.log(result);
      }
      console.log(`in refresh token handler`);
      if (err || foundUser.email !== decoded?.email)
        return next(new AppError("Forbidden token not valid wtf", 403));

      // Refresh token was still valid
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
            role: decoded.role,
          },
        },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        { email: foundUser.email },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();
      // console.log(result);

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ role: foundUser.role, accessToken });
    }
  );
});

export { handleRefreshToken };
