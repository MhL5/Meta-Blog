import { useToast } from "@/components/ui/use-toast";
import { useAxiosPrivate } from "@/features/authentication/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export type Tag =
  | "travel"
  | "nature"
  | "health"
  | "food"
  | "technology"
  | "inspiration"
  | "lifeStyle";

export type Article = {
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
  createdAt: Date;
  updatedAt: Date;
  articleComments: {
    _id: string;
    userId: {
      _id: string;
      fullName: string;
      avatar: string;
      createdAt: Date;
      updatedAt: Date;
    };
    articleId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  articleLikes: {
    _id: string;
    userId: string;
    articleId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  articleViews: { _id: string; articleId: string; createdAt: string }[];
};

type ArticlesResponse = {
  status: "success" | "fail";
  results: number;
  data: Article[];
};

export function useGetArticles() {
  const { axiosPrivate } = useAxiosPrivate();
  const { toast } = useToast();

  const {
    data: articles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get<ArticlesResponse>(`/articles`);
        return res.data;
      } catch (error) {
        toast({ variant: "destructive", description: `Error:${error}` });
      }
    },
  });

  return { articles, error, isLoading };
}
