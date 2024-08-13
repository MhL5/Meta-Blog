import prismaClient from "@/lib/prismaClient";
import { SearchParams } from "@/types/customType";
import { calcPageSortParams } from "@/utils/calcPageSortParams";
import { Categories } from "@prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import "server-only";
import { z } from "zod";

type getArticleParams = {
  category: string;
  searchParams: SearchParams;
};

const CategorySchema = z.nativeEnum(Categories);

export const getCategoryArticles = cache(
  async ({ category, searchParams }: getArticleParams) => {
    const validCategory = CategorySchema.safeParse(category).data;
    const { orderBy, takeArticle } = calcPageSortParams({ searchParams });

    if (!validCategory) return notFound();

    const articles = await prismaClient.article.findMany({
      where: { category: validCategory },
      include: {
        articleComments: true,
        articleLikes: true,
        favoriteArticle: true,
      },
      orderBy,
      take: takeArticle,
    });

    return articles;
  },
);
