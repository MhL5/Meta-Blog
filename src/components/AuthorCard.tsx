import { truncateText } from "@/utils/truncateText";
import { Heart, Newspaper, Star } from "lucide-react";
import Link from "next/link";
import GradientBorder from "./ui/GradientBorder";
import GradientUnderlineText from "./ui/GradientUnderlineText";
import UserAvatar from "./UserAvatar";

export type AuthorCardProps = {
  id: string;
  image: string | null;
  name: string | null;
  bio: string | null;
  articleLikesCount: number;
  favoritesArticlesCount: number;
  articlesCount: number;
};

export default function AuthorCard({
  image,
  bio,
  id,
  name,
  articleLikesCount,
  favoritesArticlesCount,
  articlesCount,
}: AuthorCardProps) {
  return (
    <GradientBorder className="mx-2 w-80 cursor-pointer rounded-xl border border-border text-center backdrop-blur-xl">
      <Link href={`/authors/${id}`} className="flex h-full w-full flex-col p-4">
        <div className="mx-auto mb-6 mt-2 w-32 rounded-full">
          <UserAvatar
            className="aspect-square h-full w-full"
            width={32}
            height={32}
            imageSrc={image || ""}
            username={name || ""}
          />
        </div>

        <div>
          <GradientUnderlineText className="text-xl font-bold">
            {name}
          </GradientUnderlineText>
        </div>

        <p className="my-4 px-4 text-center">{!!bio && truncateText(bio)}</p>

        <div className="mt-auto flex items-center justify-center space-x-4">
          <span className="flex items-center text-yellow-400 dark:text-yellow-500">
            {favoritesArticlesCount}
            <Star className="ml-1 inline-block h-4 w-4" />
          </span>
          <span className="flex items-center text-red-400 dark:text-red-500">
            {articleLikesCount} <Heart className="ml-1 inline-block h-4 w-4" />
          </span>
          <span className="flex items-center">
            {articlesCount} <Newspaper className="ml-1 inline-block h-4 w-4" />
          </span>
        </div>
      </Link>
    </GradientBorder>
  );
}
