import "server-only";
import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SearchParams } from "./page";
import { calcPageSortParams } from "@/utils/calcPageSortParams";

type GetAuthorParams = {
  authorId: string;
  searchParams?: SearchParams;
};

export const getAuthor = cache(
  async ({ authorId, searchParams }: GetAuthorParams) => {
    const { orderBy, takeArticle } = calcPageSortParams({ searchParams });

    const authorStatsCountPromise = prismaClient.user.findUnique({
      where: { id: authorId },
      select: {
        Articles: {
          select: {
            _count: { select: { favoriteArticle: true, articleLikes: true } },
          },
        },
      },
    });
    const authorPromise = prismaClient.user.findUnique({
      where: { id: authorId },
      include: {
        Articles: {
          include: {
            articleComments: true,
            articleLikes: true,
            favoriteArticle: true,
          },
          take: takeArticle,
          orderBy,
        },
      },
    });

    const [author, authorStatsCount] = await Promise.all([
      authorPromise,
      authorStatsCountPromise,
    ]);

    if (!author) return notFound();

    let authorStats = {
      articleLikesCount: 0,
      favoritesArticlesCount: 0,
      articlesCount: authorStatsCount?.Articles?.length || 0,
    };
    if (authorStatsCount?.Articles)
      authorStats = authorStatsCount?.Articles.reduce((acc, curArticle) => {
        acc.articleLikesCount += curArticle._count.articleLikes;
        acc.favoritesArticlesCount += curArticle._count.favoriteArticle;
        return acc;
      }, authorStats);

    return { author, authorStats };
  },
);
