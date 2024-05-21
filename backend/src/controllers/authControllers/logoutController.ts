import { UserModel } from "../../model/userModel";
import { catchAsyncMiddleware } from "../../utils/catchAsync";
import { cookieCleaner } from "./utils/generateAuthTokens";

const handleLogout = catchAsyncMiddleware(async (req, res, next) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    cookieCleaner({ res });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  cookieCleaner({ res });
  res.sendStatus(204);
});

export { handleLogout };
