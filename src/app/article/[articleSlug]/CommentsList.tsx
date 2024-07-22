"use client";

import { MessageCircleMore } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Link from "next/link";
import AddComment from "./AddComment";
import { useArticleContext } from "./ArticleContext";
import Comment from "./Comment";
import { createComment } from "./commentActions";
import { useSession } from "next-auth/react";

export default function CommentsList() {
  const {
    article: { articleComments, slug },
    curUserId,
  } = useArticleContext();

  // const { execute: createCommentAction, optimisticState: comments } =
  //   useOptimisticAction(createComment, {
  //     currentState: articleComments,
  //     updateFn(state, input) {
  //       return [
  //         ...state,
  //         {
  //           ...input,
  //           id: `${input.content + user?.id}`,
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //           user,
  //           userId: user?.id,
  //         },
  //       ];
  //     },
  //   });

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
        {articleComments.length > 0 ? (
          <>
            {articleComments.map((comment) => {
              return (
                <>
                  <Comment
                    comment={comment}
                    loggedInUserId={curUserId}
                    key={comment.id}
                    articleSlug={slug}
                  />
                </>
              );
            })}
          </>
        ) : (
          <>
            <li className="mb-8 mt-14 text-center">
              No comments yet. Be the first to leave a comment!
            </li>
          </>
        )}

        {curUserId ? (
          <AddComment
            // articleId={articleId}
            // loggedInUserId={curUserId}
            // createCommentAction={createCommentAction}
            // articleSlug={articleSlug}
          />
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
