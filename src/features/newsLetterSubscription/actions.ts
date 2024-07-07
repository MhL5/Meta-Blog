"use server";

import { z } from "zod";
import { actionClient, ActionClientError } from "@/lib/safe-action";
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
        throw new ActionClientError("You are already subscribed!");

      throw new ActionClientError("Something went wrong! please try again");
    }
  });
