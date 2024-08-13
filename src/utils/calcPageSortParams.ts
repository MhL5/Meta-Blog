import { SortSearchParam } from "@/components/ArticleGrid/SortButton";
import { z } from "zod";

type OrderBy =
  | { createdAt?: "desc" | "asc" }
  | { favoriteArticle: { _count: "desc" | "asc" } }
  | { articleLikes: { _count: "desc" | "asc" } };

const SortSchema = z.enum(["latest", "oldest", "most-favorite", "most-liked"]);
const PageSchema = z.number().min(1);

export function calcPageSortParams({
  searchParams,
}: {
  searchParams?: { sort?: SortSearchParam; page?: string };
}) {
  const page = PageSchema.safeParse(Number(searchParams?.page)).data || 1;
  let takeArticle = 1;
  if (page >= 1) takeArticle = page === 1 ? 9 : 9 + page * 3;

  const sort = SortSchema.safeParse(searchParams?.sort).data || "latest";

  let orderBy: OrderBy = {
    createdAt: "desc",
  };
  switch (sort) {
    case "latest":
      orderBy = { createdAt: "desc" };
      break;
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "most-favorite":
      orderBy = {
        favoriteArticle: {
          _count: "desc",
        },
      };
      break;
    case "most-liked":
      orderBy = {
        articleLikes: {
          _count: "desc",
        },
      };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  return { orderBy, takeArticle };
}
