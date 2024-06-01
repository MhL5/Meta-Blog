import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/features/authentication/AuthContext";
import {
  ChatBubbleIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { useToggleLike } from "./useToggleLike";
import { ArticleLike as ArticleLikeType } from "@/hooks/useGetArticle";

type ArticleLikeProps = { articleId: string; articleLikes: ArticleLikeType[] };

export default function ArticleLike({
  articleId,
  articleLikes,
}: ArticleLikeProps) {
  const { auth } = useAuthContext();
  const { isTogglingLike, likeMutationVariable, toggleLike } = useToggleLike({
    articleId,
  });

  const isLiked = articleLikes.find(
    ({ userId }) => userId === auth?.data.user._id,
  );

  let optimisticLikesCount = articleLikes.length;
  if (isTogglingLike)
    optimisticLikesCount = likeMutationVariable?.isLiked
      ? articleLikes.length + 1
      : articleLikes.length - 1;

  return (
    <div className="ml-auto flex items-center gap-4 rounded-md border border-primary/40 px-4 py-2 font-bold shadow-2xl">
      <Button variant="ghost" asChild size="xs">
        <a href="#comments-section">
          <ChatBubbleIcon />
        </a>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => toggleLike({ isLiked: !isLiked })}
      >
        <div className="flex items-center gap-1">
          {isTogglingLike && (
            <>
              {likeMutationVariable?.isLiked ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon />
              )}
            </>
          )}

          {!isTogglingLike && (
            <>{isLiked ? <HeartFilledIcon /> : <HeartIcon />}</>
          )}
          <span>{optimisticLikesCount}</span>
        </div>
      </Button>
    </div>
  );
}
