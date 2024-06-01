import { InferSchemaType, Schema, model } from "mongoose";

type ArticleLikeSchema = InferSchemaType<typeof articleLikeSchema>;

const articleLikeSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: [true, "like must belong to a user"],
    },
    articleId: {
      type: Schema.ObjectId,
      required: [true, "like must belong to an article"],
    },
  },
  { timestamps: true }
);

articleLikeSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const ArticleLikeModel = model<ArticleLikeSchema>(
  "ArticleLike",
  articleLikeSchema
);

export { ArticleLikeModel };
