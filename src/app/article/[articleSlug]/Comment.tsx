"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { intlFormatDistance } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCommentSchema, UpdateCommentSchema } from "./commentSchema";

type CommentProps = {
  comment: Prisma.ArticleCommentGetPayload<{
    include: { user: { select: { image: true; name: true } } };
  }>;
  loggedInUserId: string | null;
  articleSlug: string;
  className?: string;
  isWorking: boolean;
  deleteCommentAction: (input: {
    articleSlug: string;
    commentId: string;
  }) => void;
  updateCommentAction: (input: {
    commentId: string;
    articleSlug: string;
    content: string;
  }) => void;
};

export default function Comment({
  comment,
  loggedInUserId,
  className,
  articleSlug,
  deleteCommentAction,
  updateCommentAction,
  isWorking,
}: CommentProps) {
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
    deleteCommentAction({ commentId, articleSlug });
  }

  function onUpdateComment(values: z.infer<typeof updateCommentSchema>) {
    updateCommentAction(values);
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

              {loggedInUserId && loggedInUserId === comment.userId && (
                <div className="ml-auto space-x-2">
                  <Button
                    variant="destructive"
                    className="space-x-2 disabled:opacity-100"
                    size="xs"
                    disabled={isWorking}
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    <span>
                      <TrashIcon />
                    </span>
                    <span>Delete</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="space-x-2 disabled:opacity-100"
                    size="xs"
                    disabled={isWorking}
                    onClick={() => setToggleEdit((te) => !te)}
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
                    size="sm"
                    variant="secondary"
                    type="reset"
                    disabled={isWorking}
                    onClick={() => setToggleEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm">submit</Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
}