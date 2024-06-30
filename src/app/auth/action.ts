"use server";

import prismaClient from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { actionClient } from "@/lib/safe-action";
import signUpSchema from "./signUpSchema";

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const hashSaltPassword = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashSaltPassword },
    });

    return { status: "success", message: "user created", data: { user } };
  });
