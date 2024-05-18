import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { UserModel } from "../model/userModel";
import Email from "../utils/email";
import crypto from "crypto";
import { generateReadHashedToken } from "../utils/generateHashedToken";

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

  // generating user email verification token
  // const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationToken = generateReadHashedToken().generate();
  const emailVerificationTokenExpires = Date.now() + 10 * 60 * 1000;

  // 4. creating a new user: hashing and salting happens on pre save
  const newUser = await UserModel.create({
    fullName,
    email,
    password,
    passwordConfirm,
    emailVerificationToken: crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex"),
    emailVerificationTokenExpires,
  });

  // 5. removing the unwanted fields
  const unwantedFields = ["password", "active"] as const;
  unwantedFields.forEach((field) => delete newUser[field]);

  // 6. send an email
  // `${req.protocol}://${req.get("host")}/api/v1/users/resetpassword/${resetToken}`
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verify-email/${verificationToken}`;
  await new Email(newUser, url).sendWelcome();

  // 7. send the user as response
  res.status(201).json({ status: "success", data: newUser });
});

const verifyEmail = catchAsync(async (req, res, next) => {
  // Get the token from the URL.
  const hashedToken = generateReadHashedToken().readHash(
    req.params.token || ""
  );

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

export { signUp, verifyEmail };
