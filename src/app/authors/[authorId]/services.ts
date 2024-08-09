import "server-only";

import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import { SearchParams } from "./page";

type GetAuthorParams = {
  authorId: string;
  searchParams?: SearchParams;
};
type OrderBy =
  | { createdAt?: "desc" | "asc" }
  | { favoriteArticle: { _count: "desc" | "asc" } }
  | { articleLikes: { _count: "desc" | "asc" } };

const SortSchema = z.enum(["latest", "oldest", "most-favorite", "most-liked"]);
const PageSchema = z.number().min(1);

export const getAuthor = cache(
  async ({ authorId, searchParams }: GetAuthorParams) => {
    const page = PageSchema.safeParse(Number(searchParams?.page)).data || 1;
    let takeArticle = 1;
    if (page >= 1) takeArticle = page === 1 ? 9 : 9 + page * 3;

    const sort = SortSchema.safeParse(searchParams?.sort).data || "latest";
    let orderBy: OrderBy = {
      createdAt: "desc",
    };
    if (sort === "latest") orderBy = { createdAt: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "most-favorite")
      orderBy = {
        favoriteArticle: {
          _count: "desc",
        },
      };
    if (sort === "most-liked")
      orderBy = {
        articleLikes: {
          _count: "desc",
        },
      };

    const authorStatsCount = await prismaClient.user.findUnique({
      where: { id: authorId },
      select: {
        Articles: {
          select: {
            _count: { select: { favoriteArticle: true, articleLikes: true } },
          },
        },
      },
    });
    const author = await prismaClient.user.findUnique({
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
