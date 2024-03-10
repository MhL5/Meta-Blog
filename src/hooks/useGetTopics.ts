import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../services/getTopics";

function useGetTopics() {
  const { data:topics, isLoading, error } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });

  return { isLoading, error, topics };
}

export { useGetTopics };
