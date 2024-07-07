"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import prismaClient from "@/lib/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const emailSchema = z.string().email();

export const subscribeToNewsLetter = actionClient
  .schema(emailSchema)
  .action(async ({ parsedInput }) => {
    try {
      await prismaClient.newsletterSubscriber.create({
        data: { email: parsedInput },
      });

      return { status: "success", message: "subscribed successfully." };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.name === "PrismaClientKnownRequestError"
      )
        return { status: "fail", message: "You are already subscribed!" };

      return {
        status: "fail",
        message: "Something went wrong! please try again",
      };
    }
  });
