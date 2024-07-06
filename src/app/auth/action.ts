"use server";

import prismaClient from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import {
  actionClient,
  ActionClientError,
  captchaActionClient,
} from "@/lib/safe-action";
import signUpSchema from "./signUpSchema";
import loginSchema from "./loginSchema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { flattenValidationErrors } from "next-safe-action";

export const signUpAction = captchaActionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
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

/**
 * For handling errors in client
 * so far the only workaround to show errors thrown by credential provider is to use a server action
 */
export const loginAction = actionClient
  .schema(loginSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password, captcha } }) => {
    try {
      await signIn("credentials", { email, password, captcha });
    } catch (error) {
      // @ts-expect-error todo: temp solution ⏰
      const isCredentialsError = error?.cause?.err?.code === "credentials";

      if (
        error instanceof AuthError &&
        isCredentialsError &&
        error?.cause?.err?.message
      )
        throw new ActionClientError(`${error.cause.err.message}`);

      // this try catch catches some internal next js errors
      // we should throw them again so next js can catch them
      throw error;
    }
  });
