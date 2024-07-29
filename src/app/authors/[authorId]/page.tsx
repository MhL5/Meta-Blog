import { ArticleCardWithoutPointer } from "@/components/ArticleCard";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import UserAvatar from "@/components/UserAvatar";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";
import AuthorStats from "./AuthorStats";
import { Metadata } from "next";

type GetAuthorParams = { authorId: string };
type PageProps = {
  params: { authorId: string };
};

export async function generateMetadata({
  params: { authorId },
}: PageProps): Promise<Metadata> {
  const data = await getAuthor({ authorId });

  return {
    title: `${data.author.name} - Author Page`,
    description: `Explore articles by ${data.author.name}`,
    openGraph: {
      images: [data.author.image || "/meta-blog-thumbnail.png"],
      type: "profile",
    },
  };
}

const getAuthor = cache(async ({ authorId }: GetAuthorParams) => {
  const author = await prismaClient.user.findUnique({
    where: { id: authorId },
    include: {
      Articles: {
        include: {
          articleComments: true,
          articleLikes: true,
          favoriteArticle: true,
        },
      },
    },
  });

  if (!author) return notFound();

  const authorStats = author.Articles.reduce(
    (acc, curArticle) => ({
      articleLikesCount: acc.articleLikesCount + curArticle.articleLikes.length,
      favoritesArticlesCount:
        acc.favoritesArticlesCount + curArticle.favoriteArticle.length,
    }),
    {
      articleLikesCount: 0,
      favoritesArticlesCount: 0,
    },
  );

  return { author, authorStats };
});

export default async function Page({ params: { authorId } }: PageProps) {
  const author = await getAuthor({ authorId });

  return (
    <main className="mx-auto my-14 w-full max-w-7xl">
      <section className="flex flex-col items-center justify-center">
        <UserAvatar
          className="aspect-square h-36 w-36"
          height={144}
          width={144}
          imageSrc={author.author.image || ""}
          username={author.author?.name || "unknown"}
        />

        <h2 className="mt-12 text-2xl font-bold">
          <GradientUnderlineText>{author.author.name}</GradientUnderlineText>
        </h2>

        <AuthorStats
          ArticlesCount={author.authorStats.favoritesArticlesCount}
          articleLikesCount={author.authorStats.articleLikesCount}
          favoritesArticlesCount={author.author.Articles.length}
        />
      </section>

      <section>
        <div className="text-red-500">
          todo: MhL Articles:{" "}
          <button>
            Latest ordering :D follow and add a your subscription page
          </button>
        </div>
        <div className="grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
          {author.author.Articles.map((article) => {
            return (
              <ArticleCardWithoutPointer key={article.id} article={article} />
            );
          })}
        </div>
      </section>

      <div className="mb-14 mt-44">
        <NewsLetterSubscription />
      </div>
    </main>
  );
}
