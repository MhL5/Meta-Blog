import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/ui/UserAvatar";
import { intlFormatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDeleteComment } from "./useDeleteComment";
import { useUpdateComment } from "./useUpdateComment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArticleComment } from "@/hooks/useGetArticle";

type CommentProps = {
  comment: ArticleComment;
  loggedInUserId: string;
  className?: string;
};

const updateCommentSchema = z.object({
  content: z.string(),
  commentId: z.string(),
});

export default function Comment({
  comment,
  loggedInUserId,
  className,
}: CommentProps) {
  const [editComment, setEditComment] = useState("");
  const { deleteComment, isDeleting } = useDeleteComment();
  const { isUpdating, updateComment } = useUpdateComment();

  const isWorking = isDeleting || isUpdating;

  const updateCommentForm = useForm<z.infer<typeof updateCommentSchema>>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      commentId: comment._id,
      content: "",
    },
  });

  function onDeleteComment(commentId: string) {
    deleteComment({ commentId });
  }

  function onUpdateComment(values: z.infer<typeof updateCommentSchema>) {
    updateComment(values, {
      onSuccess: () => {
        updateCommentForm.reset();
        setEditComment((ec) => (!ec ? "true" : ""));
      },
    });
  }

  function handleToggleEdit() {
    setEditComment((ec) => (!ec ? "true" : ""));
    updateCommentForm.setValue("content", comment.content);
  }

  useEffect(() => {
    updateCommentForm.setValue("content", comment.content);
  }, [comment.content, updateCommentForm]);

  return (
    <Card key={comment._id} className={`${className} `}>
      <div className="flex gap-2 p-2">
        <UserAvatar url={`${comment.userId.avatar}`} />
        <div className="w-full">
          <div className="mb-4 w-full text-sm text-gray-500">
            <div className="flex w-full items-center space-x-4">
              <div className="ml-3 mr-auto space-x-4">
                <span>{comment.userId.fullName}</span>
                <span>{intlFormatDistance(comment.updatedAt, new Date())}</span>
              </div>

              {loggedInUserId && loggedInUserId === comment.userId._id && (
                <div className="ml-auto space-x-2">
                  <Button
                    variant="destructive"
                    className="space-x-2"
                    size="xs"
                    disabled={isWorking}
                    onClick={() => onDeleteComment(comment._id)}
                  >
                    <span>
                      <TrashIcon />
                    </span>
                    <span>Delete</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="space-x-2"
                    size="xs"
                    disabled={isWorking}
                    onClick={handleToggleEdit}
                  >
                    <span>
                      <Pencil2Icon />
                    </span>
                    <span>Edit</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Form {...updateCommentForm}>
            <form onSubmit={updateCommentForm.handleSubmit(onUpdateComment)}>
              <FormField
                control={updateCommentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        disabled={!editComment || isWorking}
                        className="disabled:cursor-default disabled:border-none disabled:opacity-100 disabled:shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!editComment && (
                <div className="flex justify-end gap-4 py-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    type="reset"
                    onClick={() => updateCommentForm.reset()}
                    disabled={isWorking}
                  >
                    clear
                  </Button>
                  <Button size="sm" disabled={isWorking}>
                    submit
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
}
