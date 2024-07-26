"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { intlFormatDistance } from "date-fns";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useArticleContext } from "./ArticleContext";
import { updateCommentSchema, UpdateCommentSchema } from "./schema";

type CommentProps = {
  comment: Prisma.ArticleCommentGetPayload<{
    include: { user: { select: { image: true; name: true } } };
  }>;
  className?: string;
};

export default function Comment({ comment, className }: CommentProps) {
  const {
    articleCommentsOptimistic: {
      deleteOptimisticComment,
      updateOptimisticComment,
      pendingOptimisticComment,
    },
    article: { slug: articleSlug },
    loggedInUserSession,
  } = useArticleContext();
  const [toggleEdit, setToggleEdit] = useState(false);

  // to prevent timestamp flickering in ui when real data arrives from backend
  // like 1 seconds ago turns into 3 seconds ago which is not ideal
  const commentUpdatedAt = intlFormatDistance(comment.updatedAt, new Date());
  const commentUpdatedAtWithoutSeconds =
    commentUpdatedAt.includes("second") || commentUpdatedAt.includes("now")
      ? "a few seconds ago"
      : commentUpdatedAt;

  const updateCommentForm = useForm<UpdateCommentSchema>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      commentId: comment.id,
      content: comment.content,
      articleSlug,
    },
  });

  function onDeleteComment(commentId: string) {
    deleteOptimisticComment({ commentId, articleSlug });
  }

  function onUpdateComment(values: z.infer<typeof updateCommentSchema>) {
    updateOptimisticComment(values);
    updateCommentForm.reset();
    setToggleEdit(false);
  }

  useEffect(() => {
    updateCommentForm.setValue("content", comment.content);
  }, [comment.content, updateCommentForm]);

  return (
    <Card className={`${className} `}>
      <div className="flex gap-2 p-2">
        <div>
          <Image
            src={comment.user.image || "unknown!"}
            alt={comment.user.name || "unknown!"}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="mb-4 w-full text-sm text-gray-500">
            <div className="flex w-full items-center space-x-4">
              <div className="ml-3 mr-auto space-x-4">
                <span>{comment.user.name}</span>
                <span>{commentUpdatedAtWithoutSeconds}</span>
              </div>

              {loggedInUserSession?.id &&
                loggedInUserSession.id === comment.userId && (
                  <div className="ml-auto space-x-2">
                    <Button
                      variant="destructive"
                      className="space-x-2"
                      size="xs"
                      disabled={pendingOptimisticComment}
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="space-x-2"
                      size="xs"
                      disabled={pendingOptimisticComment}
                      onClick={() => setToggleEdit((te) => !te)}
                    >
                      <SquarePen className="h-4 w-4" />
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
                    <FormControl>
                      <Input
                        required
                        type="text"
                        disabled={!toggleEdit}
                        className="disabled:cursor-default disabled:border-none disabled:opacity-100 disabled:shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!toggleEdit && (
                <div className="flex justify-end gap-4 py-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    type="reset"
                    disabled={pendingOptimisticComment}
                    onClick={() => setToggleEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="xs">Submit</Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
}
