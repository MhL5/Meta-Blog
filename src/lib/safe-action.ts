import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { googleApi } from "./fetchInstance";
import { env } from "./env";
import { z } from "zod";

// ZOD schema:
const clientInputSchema = z.object({
  captcha: z.string().min(1),
});

export const actionClient = createSafeActionClient();

/**
 * This client extends the base one and ensures that the user is authenticated before running
 * action server code function. Note that by extending the base client, you don't need to
 * redeclare the logging middleware, is will simply be inherited by the new client.
 */
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session?.user) throw new Error("Session is not valid!");
  return next({ ctx: { session } });
});

/**
 * This action client sends a request to google captcha v2 and throws errors if it doesn't receive a success response,
 * requires `captcha` string value which comes from `<ReCAPTCHA />`
 */
export const captchaActionClient = actionClient.use(
  async ({ next, clientInput }) => {
    const { captcha } = clientInputSchema.parse(clientInput);

    const response = await googleApi.post(
      `/siteverify?secret=${env.GOOGLE_RECAPTCHA_SECRET}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.success) throw new Error("Google verification failed.");

    return next({ ctx: {} });
  }
);
