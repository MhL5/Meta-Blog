import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prismaClient";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { fromZodError } from "zod-validation-error";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

const signInSchema = z.object({
  email: z.string().email().min(100),
  password: z.string().min(100),
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
      /*
       * 1. username and password exist in req.body?
       * 2. user exist and password match?
       * 3. if everything ok send the data
       */
      authorize: async (credentials) => {
        try {
          // * 1. validate username and password exist
          const { email, password } = signInSchema.parse(credentials);

          // * 2. user exist and password match?
          const user = await prismaClient.user.findUnique({
            where: { email },
          });
          const isCorrectPassword = !(
            user?.password && !(await bcrypt.compare(password, user?.password))
          );
          if (!user || !isCorrectPassword) throw new InvalidLoginError();

          // * 3. if everything ok send the data
          return user;
        } catch (error) {
          // handling zod error with zod-validation-error library
          if (error instanceof ZodError && fromZodError(error))
            throw new Error(
              error.issues.map((i) => `${i.path} ${i.message}`).join(", ")
            );

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(AuthOptions);
