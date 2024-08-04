import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RenderMarkdown from "@/features/react-md-editor/RenderMarkdown";
import { truncateText } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Bookmark, Clock4, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "./ui/badge";
import GradientUnderlineText from "./ui/GradientUnderlineText";
import Category from "./ui/category";

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      articleLikes: true;
      articleComments: true;
      favoriteArticle: true;
    };
  }>;
};

export default function ArticleCard({ article }: ArticleCardProps) {
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
            <Category variant={article.category}>{article.category}</Category>
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
