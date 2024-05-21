import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../../../model/userModel";
import { env } from "../../../utils/env";

type TokenGeneratorParams = {
  res: Response;
  user: IUser;
};

type setAuthCookiesAndRespondParams = TokenGeneratorParams & {
  newRefreshToken: string;
  accessToken: string;
};

type cookieCleanerParams = {
  res: Response;
};

export function generateRefreshToken({ res, user }: TokenGeneratorParams) {
  return jwt.sign({ email: user.email }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

export function generateAccessToken({ res, user }: TokenGeneratorParams) {
  return jwt.sign(
    {
      UserInfo: {
        email: user.email,
        role: user.role,
      },
    },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
}

export function setAuthCookiesAndRespond({
  res,
  user,
  newRefreshToken,
  accessToken,
}: setAuthCookiesAndRespondParams) {
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ role: user.role, accessToken });
}

export function cookieCleaner({ res }: cookieCleanerParams) {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
}
