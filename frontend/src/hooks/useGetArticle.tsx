import { axiosApi } from "@/services/axiosApi";
import { Tag } from "./useGetArticles";
import { useQuery } from "@tanstack/react-query";

export type ArticleComment = {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
  articleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleLike = {
  _id: string;
  userId: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

type ArticleData = {
  _id: string;
  authorId: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  title: string;
  content: string;
  readingTime: number;
  avatar: string;
  summary: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  articleComments: ArticleLike[];
  articleLikes: ArticleLike[];
  articleViews: {
    _id: string;
    articleId: string;
    createdAt: string;
  }[];
  id: string;
};
type ArticleResponse = {
  status: "success" | "fail";
  data: ArticleData;
};
type UseGetArticleParams = { articleId: string };

export default function useGetArticle({ articleId }: UseGetArticleParams) {
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const res = await axiosApi.get<ArticleResponse>(`articles/${articleId}`);
      return res.data;
    },
  });

  return { article, isLoading };
}
