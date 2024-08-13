import "server-only";
import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SortSearchParam } from "@/components/ArticleGrid/SortButton";
import { calcPageSortParams } from "@/utils/calcPageSortParams";

export const getArticles = cache(
  async ({
    searchParams,
  }: {
    searchParams: { page?: string; sort?: SortSearchParam };
  }) => {
    const { orderBy, takeArticle } = calcPageSortParams({ searchParams });

    const product = await prismaClient.article.findMany({
      include: {
        articleLikes: true,
        articleComments: true,
        favoriteArticle: true,
      },
      take: takeArticle,
      orderBy,
    });

    if (!product) notFound();
    return product;
  },
);

export const getTopFourArticles = cache(async () => {
  const topArticles = await prismaClient.article.findMany({
    orderBy: {
      articleLikes: { _count: "desc" },
    },
    take: 4,
  });

  return topArticles;
});
