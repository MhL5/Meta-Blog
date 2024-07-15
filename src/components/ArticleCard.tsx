import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
// TODO:
// import RenderMarkDown from "@/features/articles/RenderMarkDown";
import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Bookmark, Clock4, Heart, MessageCircle } from "lucide-react";
import GradientUnderlineText from "./ui/GradientUnderlineText";
import { FollowerPointerCard } from "./ui/following-pointer";
import UserAvatar from "./UserAvatar";
import { truncateText } from "@/lib/utils";

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      author: true;
      articleLikes: true;
      articleComments: true;
      favoriteArticle: true;
    };
  }>;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const articleStats = [
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
  ];

  return (
    <FollowerPointerCard
      title={
        <span className="flex items-center justify-start space-x-1">
          <UserAvatar
            imageSrc={article.author.image || ""}
            username={article.author.name || ""}
            className="h-6 w-6"
          />
          <span className="text-[10px] font-semibold">
            {article.author.name}
          </span>
        </span>
      }
    >
      <Card className="m-auto flex h-full w-full max-w-[400px]">
        <Link
          href={`/articles/${article.id}`}
          className="flex h-full w-full cursor-none flex-col"
        >
          <CardHeader className="relative m-4 mb-0 aspect-square max-h-80">
            <Image
              src={article.avatar}
              fill
              alt="image"
              className="rounded-lg object-cover"
            />
          </CardHeader>

          <CardContent className="px-4">
            <div className="mb-6 mt-2 space-x-2">
              {article.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl font-bold leading-relaxed">
              <GradientUnderlineText>{article.title}</GradientUnderlineText>
            </CardTitle>
            <summary className="my-4 text-sm leading-relaxed">
              {truncateText(article.content, 150)}
              {/* TODO: <RenderMarkDown data={truncateText(article.summary, 150)} /> */}
            </summary>
          </CardContent>

          <CardFooter className="mt-auto border-t px-4 pt-4">
            <CardDescription className="w-full">
              <ul className="flex items-center justify-between">
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
            </CardDescription>
          </CardFooter>
        </Link>
      </Card>
    </FollowerPointerCard>
  );
}