import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RenderMarkdown from "@/features/react-md-editor/RenderMarkdown";
import { truncateText } from "@/utils/truncateText";
import { Prisma } from "@prisma/client";
import { Bookmark, Clock4, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "./ui/badge";
import CategoryBadge from "./ui/categoryBadge";
import GradientUnderlineText from "./ui/GradientUnderlineText";
import { Skeleton } from "./ui/skeletion";

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      articleLikes: true;
      articleComments: true;
      favoriteArticle: true;
    };
  }>;
};

function ArticleCard({ article }: ArticleCardProps) {
  const articleStats = useMemo(
    () => [
      {
        icon: <Heart />,
        text: `${article.articleLikes.length}`,
      },
      {
        icon: <MessageCircle />,
        text: `${article.articleComments.length}`,
      },
      {
        icon: <Bookmark />,
        text: `${article.favoriteArticle.length}`,
      },
      {
        icon: <Clock4 />,
        text: `${article.readingTime} minutes`,
      },
    ],
    [
      article.articleLikes,
      article.articleComments,
      article.favoriteArticle,
      article.readingTime,
    ],
  );

  return (
    <Card className="grid">
      <Link
        href={`/article/${article.slug}`}
        className="flex h-full w-full flex-col"
      >
        <CardHeader className="relative m-4 mb-0 aspect-square h-80">
          <Image
            src={article.avatar}
            fill
            alt="image"
            className="rounded-lg object-cover"
          />
        </CardHeader>

        <CardContent className="px-4">
          <div className="mb-6 mt-2 space-x-2">
            <CategoryBadge variant={article.category}>
              {article.category}
            </CategoryBadge>
            {[...article.tags.slice(0, 2), "More..."].map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl font-bold leading-relaxed">
            <GradientUnderlineText>{article.title}</GradientUnderlineText>
          </CardTitle>
          <summary className="my-4 leading-relaxed">
            <RenderMarkdown markdown={truncateText(article.content, 150)} />
          </summary>
        </CardContent>

        <CardFooter className="mt-auto border-t pb-4 pt-4">
          <ul className="flex w-full items-center justify-between">
            {articleStats.map(({ icon, text }) => {
              return (
                <li
                  key={`${Math.random()}${icon + text}`}
                  className="flex scale-75 items-center gap-2 font-semibold"
                >
                  {icon} {text}
                </li>
              );
            })}
          </ul>
        </CardFooter>
      </Link>
    </Card>
  );
}

function ArticleCardSkeleton({ numSkeletons }: { numSkeletons: number }) {
  return (
    <>
      {Array.from({ length: numSkeletons }).map((_, i) => (
        <Card className="grid" key={`ArticleCardSkeleton-${i + i * i}`}>
          <div className="flex h-full w-full flex-col">
            <Skeleton className="m-4 h-80" />

            <div className="flex gap-2 px-4">
              <Skeleton className="px-8 py-2" />
              <Skeleton className="px-8 py-2" />
              <Skeleton className="px-8 py-2" />
              <Skeleton className="px-8 py-2" />
            </div>

            <div className="mx-4 pb-4 pt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-5 h-4 w-[40%]" />
            </div>

            <div className="mx-4 flex flex-col gap-2 pb-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="mt-auto flex h-14 items-center gap-4 border-t px-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

ArticleCard.Skeleton = ArticleCardSkeleton;
export default ArticleCard;
