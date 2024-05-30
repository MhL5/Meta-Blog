import { useToast } from "@/components/ui/use-toast";
import { useAxiosPrivate } from "@/features/authentication/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUpdateComment() {
  const { axiosPrivate } = useAxiosPrivate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: updateComment,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const res = await axiosPrivate.patch(`/articles/comments/${commentId}`, {
        content,
      });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      return res.data;
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: `${(isAxiosError(error) && error.response?.data?.message) || error}`,
      });
    },
  });

  return { updateComment, isUpdating, error };
}
