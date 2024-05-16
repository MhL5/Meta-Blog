import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { UserModel } from "../model/userModel";

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

  // 4. creating a new user: hashing and salting happens on pre save
  const newUser = await UserModel.create({
    fullName,
    email,
    password,
    passwordConfirm,
  });

  // 5. removing the unwanted fields
  const unwantedFields = ["password", "active"] as const;
  unwantedFields.forEach((field) => delete newUser[field]);

  // 6. send an email
  // const url = `${req.protocol}://${req.get("host")}/me`;
  // await new Email(newUser, url).sendWelcome();

  // 7. send the user as response
  res.status(201).json({ status: "success", data: newUser });
});

export { signUp };
