import { auth, isValidGoogleCaptcha } from "@/lib/auth";
import { userSchema } from "@/utils/zodSchemas";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

// ZOD schema:
const clientInputSchema = z.object({
  captcha: z.string().min(1),
});

/**
 * Represents an error type specifically designed to be used in client-facing scenarios.
 * This class extends the built-in JavaScript Error class, adding a custom message property.
 * ### Do not add the whole error object for security, only a message
 */
export class ActionClientError extends Error {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const actionClient = createSafeActionClient({
  handleReturnedServerError(err) {
    if (err instanceof ActionClientError) {
      return err.message;
    }

    return "Oh no, something went wrong!";
  },
});

/**
 * This client extends the base one and ensures that the user is authenticated before running
 * action server code function. Note that by extending the base client, you don't need to
 * redeclare the logging middleware, is will simply be inherited by the new client.
 */
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  // this will throw errors and we wont reach the next action
  const validSession = userSchema.parse(session?.user);

  return next({ ctx: { curUser: validSession } });
});

/**
 * This action client sends a request to google captcha v2 and throws errors if it doesn't receive a success response,
 * requires `captcha` string value which comes from `<ReCAPTCHA />`
 */
export const captchaActionClient = actionClient.use(
  async ({ next, clientInput }) => {
    const { captcha } = clientInputSchema.parse(clientInput);

    if (!isValidGoogleCaptcha(captcha))
      throw new ActionClientError("Google verification failed.");

    return next({ ctx: {} });
  },
);
