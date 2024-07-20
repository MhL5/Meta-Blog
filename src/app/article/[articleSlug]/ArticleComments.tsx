import { ArticleComment } from "@prisma/client";
import { MessageCircleMore } from "lucide-react";

type ArticleCommentsProps = {
  articleComments: ArticleComment[];
};

// todo : no comments ? leave a cmd other render comments written
export default function ArticleComments({
  articleComments,
}: ArticleCommentsProps) {
  return (
    <section
      className="mt-16 min-h-40 w-full rounded-lg border px-4 py-8"
      id="comments-section"
    >
      <div className="mb-8 flex items-center gap-2 text-balance text-3xl font-bold">
        <MessageCircleMore />
        Comments
      </div>
      {articleComments.length > 0 ? (
        <>
          <div className="my-4 rounded-lg border p-4">nice article gj</div>
          <div className="my-4 rounded-lg border p-4">nice article gj</div>
          <div className="my-4 rounded-lg border p-4">nice article gj</div>
          <div className="my-4 rounded-lg border p-4">nice article gj</div>
          <div className="my-4 rounded-lg border p-4">nice article gj</div>
        </>
      ) : (
        <div className="mb-8 mt-14 text-center">
          No comments yet. Be the first to leave a comment!
        </div>
      )}
    </section>
  );
}
