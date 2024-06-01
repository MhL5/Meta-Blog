import { useAxiosPrivate } from "@/features/authentication/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type LikeResponse = {
  status: "success";
  message: "like removed" | "like added";
};
type UseToggleLikeParams = { articleId: string };

export function useToggleLike({ articleId }: UseToggleLikeParams) {
  const { axiosPrivate } = useAxiosPrivate();
  const queryClient = useQueryClient();

  const {
    mutate: toggleLike,
    variables: likeMutationVariable,
    isPending: isTogglingLike,
  } = useMutation({
    // we need to pass `isLiked` so we can access in variables
    // @ts-expect-error todo: temp solution ⏰
    // eslint-disable-next-line
    mutationFn: async ({ isLiked }: { isLiked: boolean }) => {
      const res = await axiosPrivate.post<LikeResponse>("/articles/likes", {
        articleId,
      });

      return res.data;
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["article", articleId],
      });
    },
  });

  return { toggleLike, likeMutationVariable, isTogglingLike };
}
