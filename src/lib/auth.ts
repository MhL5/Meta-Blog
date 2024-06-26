import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const AuthOptions = {
  providers: [
    Google,
    // Credentials({
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   name: "password",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Password",
    //     },
    //   },
    //   authorize: async (credentials) => {
    //     // todo: implement logic to verify credentials
    //     let user = null;

    //     // logic to salt and hash password
    //     const pwHash = saltAndHashPassword(credentials.password);

    //     // logic to verify if user exists
    //     user = await getUserFromDb(credentials.email, pwHash);

    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // meaning this is also the place you could do registration
    //       throw new Error("User not found.");
    //     }

    //     // return user object with the their profile data
    //     return user;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(AuthOptions);
