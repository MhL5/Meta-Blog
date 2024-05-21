import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { UserModel } from "../../model/userModel";
import Email from "../../utils/email";
import { generateReadHashedToken } from "../../utils/generateHashedToken";
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookiesAndRespond,
} from "./utils/generateAuthTokens";

const login = catchAsync(async (req, res, next) => {
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
  const accessToken = generateAccessToken({ res, user });
  const newRefreshToken = generateRefreshToken({ res, user });

  // Changed to let keyword
  let newRefreshTokenArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    // Scenario added here:
    //   1. User logs in but never uses RT and does not logout
    //   2. RT is stolen
    //   3. If 1 & 2, reuse detection is needed to clear all RTs when user logs in

    const refreshToken = cookies.jwt;
    const foundToken = await UserModel.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    // 'attempted refresh token reuse at login!'
    // clear out ALL previous refresh tokens
    if (!foundToken) newRefreshTokenArray = [];

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  }

  // Saving refreshToken with current user
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await user.save();

  // Send authorization roles and access token to user
  user.refreshToken = [];

  // Creates Secure Cookie with refresh token
  // ! TEST
  // res.cookie("jwt", newRefreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });

  // res.json({ role: user.role, accessToken });
  setAuthCookiesAndRespond({ res, user, newRefreshToken, accessToken });
});

const signUp = catchAsync(async (req, res, next) => {
  // 1. extracting user signup required fields
  const { fullName, email, password, passwordConfirm } = req.body;

  // 2. check if (fullName, email, password, passwordConfirm) exist
  if (!fullName || !email || !password || !passwordConfirm)
    return next(
      new AppError(
        "fullName, email, password, passwordConfirm must be included.",
        403
      )
    );

  // 3. check if user duplicate exist
  const duplicateUser = await UserModel.findOne({ email });
  if (duplicateUser)
    return next(
      new AppError(
        "Email already exists. Please log in or use a different email.",
        409
      )
    );

  // 4. generating user email verification token
  const verificationToken = generateReadHashedToken.generate();
  const emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;

  // 5. creating a new user:
  // hashing and salting happens on pre save
  const newUser = await UserModel.create({
    fullName,
    email,
    password,
    passwordConfirm,
    emailVerificationToken: generateReadHashedToken.toHash(verificationToken),
    emailVerificationTokenExpires,
  });

  // 6. removing the unwanted fields
  const unwantedFields = ["password", "active"] as const;
  unwantedFields.forEach((field) => delete newUser[field]);

  // 7. send an email
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verify-email/${verificationToken}`;
  await new Email(newUser, url).sendWelcome();

  // 8. send the user as response
  res.status(201).json({ status: "success", data: newUser });
});

const verifyEmail = catchAsync(async (req, res, next) => {
  // Get the token from the URL.
  const hashedToken = generateReadHashedToken.readHash(req.params.token || "");

  // 1. Find the user based on the token.
  const user = await UserModel.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.redirect(
      "http://localhost:5173/error?error=token-is-invalid-or-expired&statusCode=400"
    );

  // Update the user's emailVerificationToken and
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  user.active = true;

  // Save the changes.
  await user.save({ validateBeforeSave: false });
  return res.redirect("http://localhost:5173/signup?tab=login&welcome=true");
});

export { signUp, verifyEmail, login };
