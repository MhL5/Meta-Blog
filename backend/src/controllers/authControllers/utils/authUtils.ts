import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../../../model/userModel";
import { env } from "../../../utils/env";
import { promisify } from "util";

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

/**
 * Class representing utility functions for authentication operations.
 * Includes methods for
 * * generating refresh and access tokens,
 * * setting authentication cookies,
 * * cleaning cookies.
 */
class AuthUtils {
  constructor() {}

  generateRefreshToken({ res, user }: TokenGeneratorParams) {
    return jwt.sign({ email: user.email }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  }

  generateAccessToken({ res, user }: TokenGeneratorParams) {
    return jwt.sign({ data: { user } }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
  }

  /**
   * Sets  `refresh cookie` and responds with `{ data: { user }, accessToken }`.
   */
  setAuthCookiesAndRespond({
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

    res.status(200).json({ data: { user }, accessToken });
  }

  cookieCleaner({ res }: cookieCleanerParams) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  }
}

export default new AuthUtils();
