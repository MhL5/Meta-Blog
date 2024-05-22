import { generateReadHashedToken } from "../../../utils/generateHashedToken";
import { catchAsyncMiddleware } from "../../../utils/catchAsync";
import { UserModel } from "../../../model/userModel";
import { env } from "../../../utils/env";

/**
 * Handles email verification process.
 * - if user token is valid it will redirect the user into login page
 * - if user token is invalid it will redirect the user to the error page
 */
const handleVerifyEmail = catchAsyncMiddleware(async (req, res, next) => {
  // Get the token from the URL.
  const hashedToken = generateReadHashedToken.readHash(req.params.token || "");

  // 1. Find the user based on the token.
  const user = await UserModel.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.redirect(
      `${env.FRONTEND_DOMAIN}/error?error=token-is-invalid-or-expired&statusCode=400`
    );

  // Update the user's emailVerificationToken and
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  user.active = true;

  // Save the changes.
  await user.save({ validateBeforeSave: false });
  return res.redirect(`${env.FRONTEND_DOMAIN}/signup?tab=login&welcome=true`);
});

export default handleVerifyEmail;
