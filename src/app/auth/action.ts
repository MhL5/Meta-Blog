"use server";

import prismaClient from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { actionClient } from "@/lib/safe-action";
import signUpSchema from "./signUpSchema";
import { env } from "@/lib/env";
import { googleApi } from "@/lib/fetchInstance";

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, name, password, captcha } }) => {
    // todo: write a action Client for this
    // checking google captcha auth
    const response = await googleApi.post(
      `/siteverify?secret=${env.GOOGLE_RECAPTCHA_SECRET}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!response.success) throw new Error("Google verification failed.");

    const hashSaltPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashSaltPassword },
    });

    return {
      status: "success",
      message: "user created",
      data: { user },
    };
  });
