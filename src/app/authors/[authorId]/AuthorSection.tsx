import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import UserAvatar from "@/components/UserAvatar";
import AuthorStats from "./AuthorStats";
import { getAuthor } from "./services";
import { ComponentPropsWithoutRef } from "react";

type AuthorSectionProps = {
  authorId: string;
} & ComponentPropsWithoutRef<"section">;

export default async function AuthorSection({
  authorId,
  className,
  ...props
}: AuthorSectionProps) {
  const author = await getAuthor({
    authorId,
  });

  return (
    <section className="flex flex-col items-center justify-center" {...props}>
      <UserAvatar
        className="aspect-square h-36 w-36"
        height={144}
        width={144}
        imageSrc={author.author?.image || ""}
        username={author.author?.name || "unknown"}
      />

      <h2 className="mb-3 mt-12 text-3xl font-bold capitalize">
        <GradientUnderlineText>{author.author.name}</GradientUnderlineText>
      </h2>

      <AuthorStats
        ArticlesCount={author.authorStats.articlesCount}
        articleLikesCount={author.authorStats.articleLikesCount}
        favoritesArticlesCount={author.authorStats.favoritesArticlesCount}
      />

      <div className="mt-6 text-lg">{author.author.bio}</div>
    </section>
  );
}
