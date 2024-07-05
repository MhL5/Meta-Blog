import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prismaClient";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { fromZodError } from "zod-validation-error";
import { cache } from "react";
import { googleApi } from "./fetchInstance";
import { env } from "process";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}
class InvalidCaptchaError extends CredentialsSignin {
  code = "Invalid Captcha";
}
class InvalidValidationError extends CredentialsSignin {
  code = "Incorrect input";
}

const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  captcha: z.string().min(1),
});

const AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Google,
    Github,
    credentials({
      name: "password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
          name: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
          name: "password",
        },
      },
      /**
       * Todo: add error handling for frontend
       * 1. Check google Recaptcha validate username and password exist
       * 2. user exist and password match?
       * 3. if everything ok send the data
       */
      authorize: async (credentials) => {
        try {
          // * 1. Check google Recaptcha validate username and password exist
          const { email, password, captcha } = signInSchema.parse(credentials);

          if (!(await isValidGoogleCaptcha(captcha)))
            throw new InvalidCaptchaError();

          // * 2. user exist and password match?
          const user = await prismaClient.user.findUnique({
            where: { email },
          });

          let isCorrectPassword = false;
          if (user?.password)
            isCorrectPassword = await bcrypt.compare(password, user.password);

          if (!user || !isCorrectPassword) throw new InvalidLoginError();

          // * 3. if everything ok send the data
          return user;
        } catch (error) {
          // handling zod error with zod-validation-error library
          if (error instanceof ZodError && fromZodError(error))
            throw new InvalidValidationError(
              error.issues.map((i) => `${i.path} ${i.message}`).join(", ")
            );

          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(AuthOptions);

/**
 * ### Caches next-auth `auth()`,
 * @description Caches and deduplicates the result of the next-js `auth()` request for a **single server request** with react `cache` function
 * #### `warning` : Do not use this in server actions, this function only meant to be used inside components and pages
 */
export const cachedAuth = cache(auth);

/**
 * Receives captcha string and validates it against google site verify api
 */
export async function isValidGoogleCaptcha(captcha: string) {
  const response = await googleApi.post(
    `/siteverify?secret=${env.GOOGLE_RECAPTCHA_SECRET}&response=${captcha}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.success) return false;

  return true;
}
