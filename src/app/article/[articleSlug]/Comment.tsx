"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { intlFormatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCommentSchema, UpdateCommentSchema } from "./commentSchema";
import { Prisma } from "@prisma/client";

type CommentProps = {
  comment: Prisma.ArticleCommentGetPayload<{ include: { user: true } }>;
  loggedInUserId: string;
  articleSlug: string;
  className?: string;
};

export default function Comment({
  comment,
  loggedInUserId,
  className,
  articleSlug,
}: CommentProps) {
  const [editComment, setEditComment] = useState("");
  //   const { deleteComment, isDeleting } = useDeleteComment();
  //   const { isUpdating, updateComment } = useUpdateComment();

  //   const isWorking = isDeleting || isUpdating;

  const updateCommentForm = useForm<UpdateCommentSchema>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      commentId: comment.id,
      content: "",
      articleSlug,
    },
  });

  function onDeleteComment(commentId: string) {
    // deleteComment({ commentId });
  }

  function onUpdateComment(values: z.infer<typeof updateCommentSchema>) {
    // updateComment(values, {
    //   onSuccess: () => {
    //     updateCommentForm.reset();
    //     setEditComment((ec) => (!ec ? "true" : ""));
    //   },
    // });
  }

  function handleToggleEdit() {
    setEditComment((ec) => (!ec ? "true" : ""));
    updateCommentForm.setValue("content", comment.content);
  }

  useEffect(() => {
    updateCommentForm.setValue("content", comment.content);
  }, [comment.content, updateCommentForm]);

  return (
    <Card className={`${className} `}>
      <div className="flex gap-2 p-2">
        <UserAvatar
          imageSrc={comment.user.image || "unknown!"}
          username={comment.user.name || "unknown!"}
        />
        <div className="w-full">
          <div className="mb-4 w-full text-sm text-gray-500">
            <div className="flex w-full items-center space-x-4">
              <div className="ml-3 mr-auto space-x-4">
                <span>{comment.user.name}</span>
                <span>{intlFormatDistance(comment.updatedAt, new Date())}</span>
              </div>

              {loggedInUserId && loggedInUserId === comment.userId && (
                <div className="ml-auto space-x-2">
                  <Button
                    variant="destructive"
                    className="space-x-2"
                    size="xs"
                    // disabled={isWorking}
                    onClick={() => onDeleteComment(comment.id)}
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
                    // disabled={isWorking}
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
                        disabled={!editComment}
                        // disabled={!editComment || isWorking}
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
                    // disabled={isWorking}
                  >
                    clear
                  </Button>
                  <Button
                    size="sm"
                    //   disabled={isWorking}
                  >
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
