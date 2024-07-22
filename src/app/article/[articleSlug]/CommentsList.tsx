"use client";

import { MessageCircleMore } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Link from "next/link";
import AddComment from "./AddComment";
import { useArticleContext } from "./ArticleContext";
import Comment from "./Comment";
import { createComment, deleteComment, updateComment } from "./commentActions";
import { useState } from "react";

export default function CommentsList() {
  const {
    article: { articleComments, slug },
    loggedInUserSession,
  } = useArticleContext();
  const [ops, setOps] = useState("");

  const {
    execute: createCommentAction,
    optimisticState: createCommentOps,
    isExecuting: isCreatingComment,
  } = useOptimisticAction(createComment, {
    currentState: articleComments,
    updateFn(state, input) {
      const { articleSlug, ...inputs } = input;

      if (!loggedInUserSession) return state;
      return [
        ...state,
        {
          ...inputs,
          id: `${input.articleId + input.articleSlug}`,
          userId: loggedInUserSession.id,
          user: { ...loggedInUserSession },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    },
    onExecute() {
      setOps("createCommentOps");
    },
  });

  const {
    execute: deleteCommentAction,
    optimisticState: deleteCommentOps,
    isExecuting: isDeletingComment,
  } = useOptimisticAction(deleteComment, {
    currentState: articleComments,
    updateFn(state, input) {
      return state.filter((comment) => comment.id !== input.commentId);
    },
    onExecute() {
      setOps("deleteCommentOps");
    },
  });

  const {
    execute: updateCommentAction,
    optimisticState: updateCommentOps,
    isExecuting: isUpdatingComment,
  } = useOptimisticAction(updateComment, {
    currentState: articleComments,
    updateFn(state, input) {
      return state.map((comment) => {
        if (comment.id === input.commentId)
          return {
            ...comment,
            content: input.content,
            updatedAt: new Date(),
          };
        return comment;
      });
    },
    onExecute() {
      setOps("updateCommentOps");
    },
  });

  const isWorking = isUpdatingComment || isDeletingComment || isCreatingComment;

  let cmdList = articleComments;
  if (ops === "deleteCommentOps") cmdList = deleteCommentOps;
  if (ops === "createCommentOps") cmdList = createCommentOps;
  if (ops === "updateCommentOps") cmdList = updateCommentOps;

  return (
    <section
      className="mt-16 min-h-40 w-full border-t px-4 py-8"
      id="comments-section"
    >
      <div className="mb-8 flex items-center gap-2 text-balance text-3xl font-bold">
        <MessageCircleMore />
        Comments
      </div>

      <ul className="grid gap-4">
        {cmdList.length > 0 ? (
          <>
            {cmdList.map((comment) => {
              return (
                <li key={comment.id}>
                  <Comment
                    deleteCommentAction={deleteCommentAction}
                    updateCommentAction={updateCommentAction}
                    comment={comment}
                    loggedInUserId={loggedInUserSession?.id || ""}
                    articleSlug={slug}
                    isWorking={isWorking}
                  />
                </li>
              );
            })}
          </>
        ) : (
          <li className="mb-8 mt-14 text-center">
            No comments yet. Be the first to leave a comment!
          </li>
        )}

        {loggedInUserSession?.id ? (
          <AddComment createCommentAction={createCommentAction} />
        ) : (
          <li className="my-16 text-center">
            <Link
              href="/auth?tab=login"
              className="custom-hover || relative inline-block rounded-lg border px-4 py-2 text-base font-bold"
            >
              Login to leave a comment
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
