import { useAuthContext } from "@/features/authentication/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseMutateFunction } from "@tanstack/react-query";

type AddCommentProps = {
  articleId: string;
  isCreating: boolean;
  createComment: UseMutateFunction<
    unknown,
    Error,
    {
      articleId: string;
      userId: string;
      content: string;
    },
    unknown
  >;
};

const commentSchema = z.object({
  content: z.string(),
  userId: z.string(),
  articleId: z.string(),
});

export default function AddComment({
  articleId,
  createComment,
  isCreating,
}: AddCommentProps) {
  const { auth } = useAuthContext();
  let loggedInUserId = null;
  if (auth?.data.user._id) loggedInUserId = auth?.data.user._id;

  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      userId: loggedInUserId || "",
      articleId,
    },
  });

  function onCreateComment(values: z.infer<typeof commentSchema>) {
    createComment(values, {
      onSuccess: () => {
        commentForm.reset();
      },
    });
  }

  if (!loggedInUserId) return <div> Login in to leave comments </div>;
  return (
    <Form {...commentForm}>
      <form onSubmit={commentForm.handleSubmit(onCreateComment)}>
        <FormField
          control={commentForm.control}
          name={"content"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>leave</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="leave a comment..."
                  className="min-h-12"
                  {...field}
                  disabled={isCreating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 py-2">
          <Button
            size="sm"
            variant="secondary"
            type="reset"
            onClick={() => commentForm.reset()}
            disabled={isCreating}
          >
            clear
          </Button>
          <Button size="sm" disabled={isCreating}>
            submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
