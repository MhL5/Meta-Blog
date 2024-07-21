"use server";

import prismaClient from "@/lib/prismaClient";
import { authActionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import addCommentSchema from "./addCommentSchema";

export const createComment = authActionClient
  .schema(addCommentSchema)
  .action(
    async ({
      ctx: { session },
      parsedInput: { articleSlug, content, userId, articleId },
    }) => {
      // comments belong to logged in user? check article id
      if (!(session?.user?.id === userId))
        throw new Error(
          `Unauthorized: The comment does not belong to the user with ID ${userId}`,
        );

      // add comment to db
      const newComment = await prismaClient.articleComment.create({
        data: { content, userId, articleId },
      });

      // clear next js cache
      revalidatePath(`article/${articleSlug}`);

      // return new comment object
      return newComment;
    },
  );
