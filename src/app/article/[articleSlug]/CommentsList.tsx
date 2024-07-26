"use client";

import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import AddComment from "./AddComment";
import { useArticleContext } from "./ArticleContext";
import Comment from "./Comment";

export default function CommentsList() {
  const {
    loggedInUserSession,
    articleCommentsOptimistic: { optimisticComments },
  } = useArticleContext();

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
        {optimisticComments.length > 0 ? (
          <>
            {optimisticComments.map((comment) => {
              return (
                <li key={comment.id}>
                  <Comment comment={comment} />
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
          <AddComment />
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
