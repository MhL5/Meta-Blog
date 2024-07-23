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
import { useArticleContext } from "./ArticleContext";
import { createCommentSchema, CreateCommentSchema } from "./schema";

type AddCommentProps = {
  createCommentAction: (input: {
    content: string;
    articleId: string;
    articleSlug: string;
  }) => void;
};

export default function AddComment({ createCommentAction }: AddCommentProps) {
  const {
    article: { id: articleId, slug: articleSlug },
  } = useArticleContext();

  const commentForm = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: "",
      articleId,
      articleSlug,
    },
  });

  function onCreateComment(values: CreateCommentSchema) {
    createCommentAction(values);
    commentForm.reset();
  }

  return (
    <Form {...commentForm}>
      <form
        onSubmit={(e) => {
          commentForm.handleSubmit(onCreateComment)(e);
        }}
      >
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
            size="xs"
            variant="secondary"
            type="reset"
            onClick={() => commentForm.reset()}
          >
            clear
          </Button>
          <Button size="xs">submit</Button>
        </div>
      </form>
    </Form>
  );
}
