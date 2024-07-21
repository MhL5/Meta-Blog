import { z } from "zod";

const addCommentSchema = z.object({
  content: z.string().min(1),
  userId: z.string().min(1),
  articleId: z.string().min(1),
  articleSlug: z.string().min(1),
});

export type addCommentSchemaType = z.infer<typeof addCommentSchema>;
export default addCommentSchema;
