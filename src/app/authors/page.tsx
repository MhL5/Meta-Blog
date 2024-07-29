import AuthorCard from "@/components/AuthorCard";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import prismaClient from "@/lib/prismaClient";
import { cache } from "react";

export async function generateMetadata() {
  const title = "Our Amazing Authors";
  const description =
    "Meet our talented team of authors showcasing their published works and bios.";

  return {
    title,
    description,
    keywords: ["authors", "writers"],
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/meta-blog-thumbnail.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const getAuthors = cache(async () => {
  const authors = await prismaClient.user.findMany({
    where: {
      Articles: { some: {} },
    },
    select: {
      id: true,
      name: true,
      bio: true,
      image: true,
      Articles: {
        select: {
          _count: {
            select: {
              articleLikes: true,
              favoriteArticle: true,
            },
          },
        },
      },
    },
    take: 9,
  });

  const authorsWithStats = authors.map((authorWithCountObject) => {
    const { Articles, ...author } = authorWithCountObject;

    const authorStats = Articles.reduce(
      (acc, curArticle) => ({
        articleLikesCount:
          acc.articleLikesCount + curArticle._count.articleLikes,
        favoritesArticlesCount:
          acc.favoritesArticlesCount + curArticle._count.favoriteArticle,
      }),
      {
        articleLikesCount: 0,
        favoritesArticlesCount: 0,
      },
    );

    return { ...author, ...authorStats, articlesCount: Articles.length };
  });

  return authorsWithStats;
});

export default async function Page() {
  const authors = await getAuthors();

  return (
    <div className="min-h-dvh">
      <h2 className="mb-8 mt-10 text-center text-4xl font-bold">
        Our Amazing Authors:
      </h2>

      <section>
        <ul
          className={`grid w-full max-w-7xl items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {authors.map((author) => (
            <AuthorCard {...author} key={author.id} />
          ))}
        </ul>

        <div className="mb-14 mt-44">
          <NewsLetterSubscription />
        </div>
      </section>
    </div>
  );
}
