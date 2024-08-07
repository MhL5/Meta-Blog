import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1),
  articleId: z.string().min(1),
  articleSlug: z.string().min(1),
});
export type CreateCommentSchema = z.infer<typeof createCommentSchema>;

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

export const toggleLikeSchema = z.object({
  articleId: z.string().min(1),
  articleSlug: z.string().min(1),
});
export type ToggleLikeSchema = z.infer<typeof toggleLikeSchema>;

export const toggleFavoriteSchema = z.object({
  articleId: z.string().min(1),
  articleSlug: z.string().min(1),
});
export type ToggleFavoriteSchema = z.infer<typeof toggleFavoriteSchema>;
