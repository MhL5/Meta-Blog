import CloudinaryImage from "@/components/CloudinaryImage";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { format } from "date-fns";
import {
  Bookmark,
  CalendarDays,
  Clock4,
  Heart,
  MessageCircle,
} from "lucide-react";

type ArticleInfoProps = {
  avatar: string;
  createdAt: Date;
  readingTime: number;
  articleLikesLength: number;
  articleCommentsLength: number;
  favoriteArticleLength: number;
  tags: string[];
  authorName: string;
  authorImgUrl: string;
};

export default function ArticleInfo({
  articleCommentsLength,
  articleLikesLength,
  authorImgUrl,
  authorName,
  avatar,
  createdAt,
  favoriteArticleLength,
  readingTime,
  tags,
}: ArticleInfoProps) {
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
          <UserAvatar imageSrc={authorImgUrl} username={authorName} />

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
            {articleLikesLength} likes
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            {articleCommentsLength} comments
          </span>
          <span className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            {favoriteArticleLength} favorites
          </span>
        </div>
      </section>

      <section className="mb-14">
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
