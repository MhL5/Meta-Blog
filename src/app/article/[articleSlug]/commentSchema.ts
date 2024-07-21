import { z } from "zod";

export const addCommentSchema = z.object({
  content: z.string().min(1),
  authorId: z.string().min(1),
  articleId: z.string().min(1),
  articleSlug: z.string().min(1),
  authorImage: z.string().min(1),
  authorName: z.string().min(1),
  // authorId: z.string().min(1),
  id: z.string().min(6),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type AddCommentSchema = z.infer<typeof addCommentSchema>;

export const deleteCommentSchema = z.object({
  commentId: z.string().min(1),
  articleSlug: z.string().min(1),
});
export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;

export const updateCommentSchema = z.object({
  commentId: z.string().min(1),
  content: z.string().min(1),
  articleSlug: z.string().min(1),
});
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
