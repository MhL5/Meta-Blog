"use client";

import { Button } from "@/components/ui/button";
import { Heart, MessageCircleMore, Share2, Star } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toggleFavorite, toggleLike } from "./actions";
import { useArticleContext } from "./ArticleContext";
import "./likeBtn.css";

/*
Lets go bitches: Optimistic like with an animation
Save: Optimistic save with bg color change smooth animation for changing bg
Share: idk lets investigate, if its too much work will go with a simple url copy clipboard
*/
export default function ArticleButtons() {
  return (
    <section className="sticky bottom-[5%] z-20 my-8 flex items-center justify-center text-lg">
      <ToggleLikeButton />

      <CommentSectionButton />

      <AddToFavoritesButton />

      <ShareArticleButton />
    </section>
  );
}

function ToggleLikeButton() {
  const {
    article: { articleLikes, id: articleId, slug: articleSlug },
    loggedInUserSession,
  } = useArticleContext();

  const isLiked = Boolean(
    articleLikes.find((like) => like.userId === loggedInUserSession?.id),
  );

  const { optimisticState, execute, isExecuting } = useOptimisticAction(
    toggleLike,
    {
      currentState: !!isLiked,
      updateFn() {
        return !isLiked;
      },
    },
  );

  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-none rounded-bl-lg rounded-tl-lg transition-all duration-300 hover:px-12 disabled:opacity-100"
      onClick={() => {
        execute({ articleId, articleSlug });
      }}
      disabled={isExecuting}
      title="like button"
    >
      <span className="flex items-center gap-2">
        <Heart
          className={`${optimisticState ? `scale-125 fill-red-500 stroke-red-500` : ""} h-4 w-4 transition-all duration-300`}
        />
      </span>
    </Button>
  );
}

function CommentSectionButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-none transition-all duration-300 hover:px-12"
      asChild
      title="move to comment section"
    >
      <Link href="#comments-section">
        <span className="flex items-center gap-2">
          <MessageCircleMore className="h-4 w-4" />
        </span>
      </Link>
    </Button>
  );
}

function AddToFavoritesButton() {
  const {
    article: { favoriteArticle, slug: articleSlug, id: articleId },
    loggedInUserSession,
  } = useArticleContext();

  const isFavorite = Boolean(
    favoriteArticle.find((like) => like.userId === loggedInUserSession?.id),
  );

  const { optimisticState, execute, isExecuting } = useOptimisticAction(
    toggleFavorite,
    {
      currentState: !!isFavorite,
      updateFn() {
        return !isFavorite;
      },
    },
  );

  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-none transition-all duration-300 hover:px-12 disabled:opacity-100"
      title="Add this article to your favorites"
      onClick={() => {
        execute({ articleId, articleSlug });
      }}
      disabled={isExecuting}
    >
      <span className="flex items-center gap-2">
        <Star
          className={`${optimisticState ? `scale-125 fill-yellow-500 stroke-yellow-500` : ""} h-4 w-4 transition-all duration-300`}
        />
      </span>
    </Button>
  );
}

function ShareArticleButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-none rounded-br-lg rounded-tr-lg transition-all duration-300 hover:px-12"
      title="Share this article in social media"
    >
      <span className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
      </span>
    </Button>
  );
}
