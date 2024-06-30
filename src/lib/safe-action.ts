import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

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
