import { Categories } from "@prisma/client";
import { z } from "zod";

const writeArticleSchema = z.object({
  avatar: z
    .string()
    .url("received an invalid input, please upload your avatar again!"),
  title: z
    .string({ message: "Title must be between 2 and 50 characters." })
    .min(2, "Title must be at least 2 characters long.")
    .max(60, "Title cannot exceed 50 characters."),
  category: z.nativeEnum(Categories),
  readingTime: z.number().nonnegative(),
  tags: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .array()
    .refine(
      (tags) => tags.every((tag) => tag.length > 0),
      "tags should be bigger than one character and comma separated.",
    ),
  content: z
    .string()
    .min(100, "your blog content should be at least 100 characters long.")
    .max(10000, "blog cannot exceed 10000 characters."),
  captcha: z
    .string({
      required_error: "Google captcha validation failed, please try again",
      invalid_type_error: "Google captcha validation failed, please try again",
    })
    .min(1, "Google captcha validation failed, please try again"),
});

export type WriteArticleSchemaType = z.infer<typeof writeArticleSchema>;
export default writeArticleSchema;
