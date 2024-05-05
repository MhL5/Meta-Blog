import { InferSchemaType, Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    // authorId: refrence
    // like fk
    // comments fk
    // views fk
    title: {
      type: String,
      required: [true, "articles must include title"],
      unique: true,
      trim: true,
      maxLength: [40, "A title must have less or equal to 40 characters"],
    },
    content: {
      type: String,
      required: [true, "articles must include content"],
    },
    readingTime: {
      type: Number,
      required: [true, "articles must include reading time"],
    },
    avatar: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      required: [true, "articles must include summary"],
      trim: true,
      maxLength: [150, "A tour must have less or equal to 40 characters"],
      minLength: [10, "A tour must have more or equal to 10 characters"],
    },
    tags: {
      type: [String],
      required: [true, "articles must include tags"],
      trim: true,
      enum: {
        values: [
          "nature",
          "food",
          "inspiration",
          "life style",
          "health",
          "travel",
          "technology",
        ],
        message:
          "tag options are limited, choose between these options: nature, food, inspiration, life style, health, travel, technology",
      },
    },
  },
  { timestamps: true }
);

type article = InferSchemaType<typeof articleSchema>;
const ArticleModel = model<article>("Article", articleSchema);

export { ArticleModel };
