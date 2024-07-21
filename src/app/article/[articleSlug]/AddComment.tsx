"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import addCommentSchema, { addCommentSchemaType } from "./addCommentSchema";

type AddCommentProps = {
  articleId: string;
  loggedInUserId: string;
  articleSlug: string;
  createCommentAction: (input: {
    content: string;
    articleId: string;
    userId: string;
    articleSlug: string;
  }) => void;
};

export default function AddComment({
  articleId,
  loggedInUserId,
  createCommentAction,
  articleSlug,
}: AddCommentProps) {
  const commentForm = useForm<addCommentSchemaType>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: "",
      userId: loggedInUserId,
      articleId,
      articleSlug,
    },
  });

  function onCreateComment(values: addCommentSchemaType) {
    createCommentAction(values);
    commentForm.reset();
  }

  return (
    <Form {...commentForm}>
      <form onSubmit={commentForm.handleSubmit(onCreateComment)}>
        <FormField
          control={commentForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="leave a comment..."
                  className="min-h-12"
                  {...field}
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
          >
            clear
          </Button>
          <Button size="sm">submit</Button>
        </div>
      </form>
    </Form>
  );
}
