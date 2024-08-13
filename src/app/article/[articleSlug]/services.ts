import "server-only";

import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Article, Categories } from "@prisma/client";

export const getArticle = cache(async (articleSlug: string) => {
  const article = await prismaClient.article.findUnique({
    where: { slug: articleSlug },
    include: {
      articleComments: {
        include: { user: { select: { id: true, name: true, image: true } } },
      },
      author: true,
      articleLikes: true,
      favoriteArticle: true,
    },
  });

  if (!article) return notFound();
  return article;
});

export const getYouMightAlsoLikeArticles = cache(
  async ({
    curArticleId,
    category,
  }: {
    curArticleId: string;
    category: keyof typeof Categories;
  }) => {
    const similarArticles = await prismaClient.article.findMany({
      where: {
        category,
        id: {
          not: curArticleId,
        },
      },
      take: 3,
    });

    const numFoundArticles = similarArticles.length;
    let randomArticles: Article[] = [];
    if (numFoundArticles < 3)
      randomArticles = await prismaClient.article.findMany({
        take: 3 - numFoundArticles,
        where: {
          id: {
            not: curArticleId,
          },
        },
      });

    return [...randomArticles, ...similarArticles];
  },
);
