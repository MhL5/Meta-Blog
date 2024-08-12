import loginSchema from "@/app/auth/loginSchema";
import { env } from "@/utils/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cache } from "react";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import prismaClient from "./prismaClient";

const AuthOptions = {
  // This is a bug in next-auth V5 beta
  trustHost: true,
  adapter: PrismaAdapter(prismaClient),
  /**
   * adding id to user object
   * by default next-auth doesn't add id
   * there is no point to hide the id if email is available in frontend
   * so its safe to add it
   */
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = `${token.id}`;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
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
       * 1. Check google Recaptcha validate username and password exist
       * 2. user exist and password match?
       * 3. if everything ok send the data
       *
       * So far the only workaround to handle errors in V5 is to use a server action with signIn
       * @see "../app/auth/action.ts" loginAction for more info
       */
      authorize: async (credentials) => {
        try {
          // * 1. Check google Recaptcha validate username and password exist
          const { email, password, captcha } = loginSchema.parse(credentials);

          if (!(await isValidGoogleCaptcha(captcha)))
            throw new CredentialsSignin(
              "google captcha verification failed. please try again",
            );

          // * 2. user exist and password match?
          const user = await prismaClient.user.findUnique({
            where: { email },
          });

          let isCorrectPassword = false;
          if (user?.password)
            isCorrectPassword = await bcrypt.compare(password, user.password);

          if (!user || !isCorrectPassword)
            throw new CredentialsSignin(
              "Invalid Email or password, please try again!",
            );

          // * 3. if everything ok send the data
          return user;
        } catch (error) {
          // handling zod error with zod-validation-error library
          if (error instanceof ZodError && fromZodError(error))
            throw new CredentialsSignin(
              error.issues.map((i) => `${i.path} ${i.message}`).join(", "),
            );

          throw error;
        }
      },
    }),
  ],
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
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${env.GOOGLE_RECAPTCHA_SECRET}&response=${captcha}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  const data = await response.json();

  if (!data?.success) return false;

  return true;
}
