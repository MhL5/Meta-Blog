"use server";

import prismaClient from "@/lib/prismaClient";
import { ActionClientError, authActionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "./commentSchema";

/**
 * TODO: handle errors i should throw regular errors here
 */

/**
 * createComment
 * Steps:
 * 1. Check if user is logged in
 * 2. check input data and validate
 * 3. check if article exist
 * 4. create a comment
 * 5. clear cache
 * 6. return the data
 */
export const createComment = authActionClient
  .schema(createCommentSchema)
  .action(
    async ({
      ctx: { curUser },
      parsedInput: { articleSlug, content, articleId },
    }) => {
      // 3. check if article exist
      const article = await prismaClient.article.findUnique({
        where: { id: articleId },
      });
      if (!article) throw new ActionClientError("Article not found!");

      // 4. create a comment
      const newComment = await prismaClient.articleComment.create({
        data: { content, articleId, userId: curUser.id },
      });

      // 5. clear next js cache
      revalidatePath(`/article/${articleSlug}`);

      // 6. return new comment object
      return newComment;
    },
  );

/**
 * Delete a comment
 *
 * Steps:
 * 1. User logged in?
 * 2. check input data and validate
 * 3. Comment belongs to the logged in user?
 * 4. delete comment
 * 5. clear cache
 * 6. return
 */
export const deleteComment = authActionClient
  .schema(deleteCommentSchema)
  .action(
    async ({ ctx: { curUser }, parsedInput: { commentId, articleSlug } }) => {
      // 3. Comment belongs to the logged in user?
      const comment = await prismaClient.articleComment.findUnique({
        where: { id: commentId },
      });
      if (!comment) throw new ActionClientError("Comment not found");
      if (comment.userId !== curUser.id)
        throw new ActionClientError(
          "You are not allowed to delete other users comments",
        );

      // 4. delete comment
      await prismaClient.articleComment.delete({ where: { id: commentId } });

      // 5. clear cache
      revalidatePath(`/article/${articleSlug}`);

      // 6. retuning null
      return { status: "success", message: "comment deleted" };
    },
  );

/**
 * Update a comment
 *
 * Steps:
 * 1. User logged in?
 * 2. check input data and validate
 * 3. Comment belongs to the logged in user?
 * 4. update the comment content
 * 5. clear cache
 * 6. return updatedComment
 */
export const updateComment = authActionClient
  .schema(updateCommentSchema)
  .action(
    async ({
      ctx: { curUser },
      parsedInput: { content, articleSlug, commentId },
    }) => {
      // 3. Comment belongs to the logged in user?
      const comment = await prismaClient.articleComment.findUnique({
        where: { id: commentId },
      });
      if (!comment) throw new ActionClientError("Comment not found");
      if (comment.userId !== curUser.id)
        throw new ActionClientError(
          "You are not allowed to delete other users comments",
        );

      // 4. update the comment
      const updatedComment = await prismaClient.articleComment.update({
        where: { id: commentId },
        data: { content },
      });

      // 5. clear cache
      revalidatePath(`/article/${articleSlug}`);

      // 6. retuning updatedComment
      return updatedComment;
    },
  );
