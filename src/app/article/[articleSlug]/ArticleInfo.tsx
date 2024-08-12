import CloudinaryImage from "@/components/CloudinaryImage";
import { Badge } from "@/components/ui/badge";
import CategoryBadge from "@/components/ui/categoryBadge";
import UserAvatar from "@/components/UserAvatar";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import {
  Bookmark,
  CalendarDays,
  Clock4,
  Heart,
  MessageCircle,
} from "lucide-react";

type ArticleInfoProps = Prisma.ArticleGetPayload<{
  include: {
    articleComments: {
      include: { user: { select: { id: true; name: true; image: true } } };
    };
    author: true;
    articleLikes: true;
    favoriteArticle: true;
  };
}>;

export default function ArticleInfo({
  articleComments,
  articleLikes,
  author,
  avatar,
  createdAt,
  favoriteArticle,
  readingTime,
  tags,
  category,
}: ArticleInfoProps) {
  const authorName = author?.name || "unknown";

  return (
    <>
      <figure className="relative mx-auto mt-4 aspect-video h-[400px] w-full max-w-7xl sm:mb-8 sm:mt-6">
        <CloudinaryImage
          src={avatar}
          fill
          className="h-full w-full object-cover sm:rounded-lg"
          alt="blog avatar"
        />
      </figure>

      <section className="my-8 flex items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-4">
          <UserAvatar imageSrc={author.image} username={authorName} />

          <div>
            <div className="text-lg font-bold capitalize">{authorName}</div>
            <div className="flex gap-2 text-xs">
              <CalendarDays className="h-4 w-4" />
              <span>
                Published at {format(new Date(createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-2">
            <Clock4 className="h-4 w-4" />
            {readingTime} min read
          </span>
          <span className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {articleLikes.length} likes
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            {articleComments.length} comments
          </span>
          <span className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            {favoriteArticle.length} favorites
          </span>
        </div>
      </section>

      <section className="mb-14">
        <div className="my-4">
          <CategoryBadge
            as="link"
            variant={category}
            className="px-3 py-1.5 text-sm"
          >
            {category}
          </CategoryBadge>
        </div>
        {tags?.map((tag) => {
          return (
            <Badge className="mr-2 px-6 py-1" key="tag" variant="secondary">
              {tag}
            </Badge>
          );
        })}
      </section>
    </>
  );
}
