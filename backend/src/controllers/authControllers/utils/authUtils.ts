import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser, UserDocuments } from "../../../model/userModel";
import { env } from "../../../utils/env";
import { promisify } from "util";

type TokenGeneratorParams = {
  res: Response;
  user: UserDocuments;
};

type setAuthCookiesAndRespondParams = TokenGeneratorParams & {
  newRefreshToken: string;
  accessToken: string;
};

type cookieCleanerParams = {
  res: Response;
};

export type DecodedAccessToken = {
  data: { user: IUser };
  accessToken: string;
  iat: number;
  exp: number;
};

export function isDecodedAccessToken(
  token: unknown
): token is DecodedAccessToken {
  return !!(token as DecodedAccessToken).data.user;
}

export const jwtVerifyAsync = promisify<string, string>(jwt.verify);

function generateRefreshToken({ res, user }: TokenGeneratorParams) {
  return jwt.sign({ email: user.email }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

function generateAccessToken({ res, user }: TokenGeneratorParams) {
  return jwt.sign({ data: { user } }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
}

/**
 * - Sets  `refresh cookie`
 * - removes unwanted fields
 * - responds with `{ data: { user }, accessToken }`.
 */
function setAuthCookiesAndRespond({
  res,
  user,
  newRefreshToken,
  accessToken,
}: setAuthCookiesAndRespondParams) {
  /**
   * Setting cookie
   */
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  /**
   * Removing unwanted fields from user object for Security
   */
  const keysToDelete = ["__v", "password", "active", "refreshToken"] as const;
  const updatedUser = user.toObject();
  keysToDelete.forEach((key) => delete updatedUser[key]);

  res.status(200).json({ data: { user: updatedUser }, accessToken });
}

/**
 * Sending the response
 */
function cookieCleaner({ res }: cookieCleanerParams) {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
}

// TODO: FIX THIS MESS
const AuthUtils = {
  cookieCleaner,
  setAuthCookiesAndRespond,
  generateAccessToken,
  generateRefreshToken,
};

export default AuthUtils;
