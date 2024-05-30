import { useToast } from "@/components/ui/use-toast";
import { useAxiosPrivate } from "@/features/authentication/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteComment() {
  const { axiosPrivate } = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: deleteComment,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const res = await axiosPrivate.delete(`/articles/comments/${commentId}`);
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

  return { deleteComment, isDeleting, error };
}
