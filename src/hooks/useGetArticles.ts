import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/getArticles";

function useGetArticles() {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  return { articles, error, isLoading };
}

export { useGetArticles };
