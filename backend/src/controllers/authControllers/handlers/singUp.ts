import { catchAsyncMiddleware } from "../../../utils/catchAsync";
import { AppError } from "../../../utils/appError";
import { UserModel } from "../../../model/userModel";
import Email from "../../../utils/email";
import { generateReadHashedToken } from "../../../utils/generateHashedToken";

/**
 * Handles user sign-up process.
 * 
 * 1. extracting user signup required fields from `req.body`
 * 2. check if `fullName`, `email`, `password`, `passwordConfirm` exist
 * 3. check if `user` duplicate exist
 * 4. generating user email verification token
 * 5. creating a new inactive `user`
 * 6. removing the unwanted fields
 * 7. send an email
 * 8. send the user as response
 */
const handleSignUp = catchAsyncMiddleware(async (req, res, next) => {
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
  res.status(201).json({ status: "success", message:"please verify your'e email" });
});

export default handleSignUp;
