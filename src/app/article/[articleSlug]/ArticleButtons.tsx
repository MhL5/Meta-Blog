"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Heart, MessageCircleMore, Share2, Star } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useMemo } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toggleFavorite, toggleLike } from "./actions";
import { useArticleContext } from "./ArticleContext";

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
  const { toast } = useToast();

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
        if (!loggedInUserSession?.id)
          toast({
            title: "Please login to like this article",
            description: (
              <Button asChild variant="outline" size="xs">
                <Link href="/auth?tab=login">Login</Link>
              </Button>
            ),
          });
        else execute({ articleId, articleSlug });
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
  const { toast } = useToast();

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
        if (!loggedInUserSession?.id)
          toast({
            title: "Please login first to add this article to your favorites",
            description: (
              <Button asChild variant="outline" size="xs">
                <Link href="/auth?tab=login">Login</Link>
              </Button>
            ),
          });
        else execute({ articleId, articleSlug });
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
  const {
    article: { slug, title },
  } = useArticleContext();

  const ShareButtonProps = {
    url: `${process.env.NEXT_PUBLIC_APPLICATION_DOMAIN}/article/${slug}` || "",
    title: `Meta blog: ${title}`,
  };

  // static object[] for rendering buttons
  const shareButtons = useMemo(
    () => [
      {
        platform: "linkedin",
        Component: LinkedinShareButton,
        id: "2d2d5a081f9bf2d1ee1e90a230df7504acd39459857235f868768545cb4169e01eb02fab8e2ae22baafca0da6bfd30541f5ed391ea8e55cc7b4b9adf8a1ad0e4",
        Icon: LinkedinIcon,
      },
      {
        platform: "twitter",
        Component: TwitterShareButton,
        id: "0c7e52cadc212e5c3ea4bca45c01dc104a93e18ec82067ea3a6946bf9505793fe73610c8e0e318337d24273ba84ffe9615bfd67969e9035c0577bef4bd25ebab",
        Icon: TwitterIcon,
      },
      {
        platform: "whatsapp",
        Component: WhatsappShareButton,
        id: "7949c55b43811078ad9adca34447493c463ab33631f35d851a04adab0ee7f393688ce2e396f68f5fd3ecfe6e35a8669b8b553cdf42497ddc2d78d5d686dba7da",
        Icon: WhatsappIcon,
      },
      {
        platform: "telegram",
        Component: TelegramShareButton,
        id: "407b43dd25e3f801bb2804c64865be42587b9b189199b6e1da820853be09c471acea3523cb0d5c178b511a864d9dfc9dfda506b64c4cf36750085e0e9b4f58b7",
        Icon: TelegramIcon,
      },
    ],
    [],
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild title="Share this article in social media">
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Share this article in: </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {shareButtons.map(({ platform, Component, id, Icon }) => {
              return (
                <DropdownMenuItem key={id} className="w-full space-y-2 text-sm">
                  <Button variant="ghost" size="xs" className="m-0 w-full p-0">
                    <Component className="w-full" {...ShareButtonProps}>
                      <div className="flex w-full items-center gap-1 px-2">
                        <Icon className="h-6 w-6 rounded-lg" />
                        <span className="inline-block pl-2 font-semibold capitalize">
                          {platform}
                        </span>
                      </div>
                    </Component>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
