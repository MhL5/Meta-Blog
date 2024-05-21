import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import catchAsync from "../utils/catchAsync";
// import { AppError } from "../utils/appError";

const verifyJWT = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log(authHeader);
  if (typeof authHeader !== "string") return res.sendStatus(400);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1] || "";

  jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    console.log(decoded);
    /*{
  UserInfo: { email: 'sapumr@gmail.com', roles: 'user' },
  iat: 1716194759,
  exp: 1716194769
}
*/
    // @ts-expect-error temp
    req.user = decoded.UserInfo.email;
    // @ts-expect-error temp
    req.roles = decoded.UserInfo.roles;

    next();
  });
});

export { verifyJWT };
