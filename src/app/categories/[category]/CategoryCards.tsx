import ArticleCard from "@/components/ArticleCard";
import prismaClient from "@/lib/prismaClient";
import { Categories } from "@prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import { z } from "zod";

type CategoryCardsProps = {
  category: string;
};

const CategorySchema = z.nativeEnum(Categories);

const getArticles = cache(async ({ category }: { category: string }) => {
  const validCategory = CategorySchema.safeParse(category).data;

  if (!validCategory) return notFound();

  const articles = await prismaClient.article.findMany({
    where: { category: validCategory },
    include: {
      articleComments: true,
      articleLikes: true,
      favoriteArticle: true,
    },
  });

  return articles;
});

export default async function CategoryCards({ category }: CategoryCardsProps) {
  const articles = await getArticles({ category });
  // query database get this category articles
  // if nothing show 0 articles or some shit add something
  // skeleton
  if (articles.length === 0) return "something add :|";
  return (
    <>
      {articles.map((article) => {
        return <ArticleCard key={article.id} article={article} />;
      })}
    </>
  );
}
