// import { promisify } from "util";
// import { AppError } from "../utils/appError";
// import catchAsync from "../utils/catchAsync";
// import jwt from "jsonwebtoken";
// import { env } from "../utils/env";
// import { UserModel } from "../model/userModel";

// const protect = catchAsync(async (req, res, next) => {
//   // 1. grabbing the token if it exist
//   let token = null;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {   
//     token = req.headers.authorization.replace("Bearer ", "");
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token)
//     return next(
//       new AppError("You are not logged in! please login to get access", 401)
//     );

//   // 2. token verification
//   const decoded = await promisify(jwt.verify)(token, env.ACCESS_TOKEN_SECRET);

//   // token might be stolen and it should not work after users removes the account or changes his password 3-4
//   // 3. check if user still exist
//   const currentUser = await UserModel.findById(decoded?.id || "");
//   if (!currentUser)
//     return next(
//       new AppError("This user belonging to this token no longer exist", 401)
//     );

//   // 4. check if user changes password after token was issued
//   if (currentUser.changedPasswordAfter(decoded?.iat))
//     return next(
//       new AppError("User recently changed password! please login again", 401)
//     );

//   // Grant access to protected Route
//   req.user = currentUser;
//   //  for using it in our templates
//   res.locals.user = currentUser;
//   next();
// });

// export { protect };
