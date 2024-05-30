import { useAxiosPrivate } from "@/features/authentication/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment() {
  const { axiosPrivate } = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutate: createComment,
    isPending: isCreating,
    error,
    variables,
  } = useMutation({
    mutationFn: async ({
      articleId,
      userId,
      content,
    }: {
      articleId: string;
      userId: string;
      content: string;
    }) => {
      const res = await axiosPrivate.post(`/articles/comments`, {
        articleId,
        userId,
        content,
      });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      return res.data;
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });

  return { createComment, isCreating, error, variables };
}
