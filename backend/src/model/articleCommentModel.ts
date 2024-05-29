import { InferSchemaType, Query, Schema, model } from "mongoose";

type Comment = InferSchemaType<typeof articleCommentSchema>;

const articleCommentSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "comment must belong to a user"],
    },
    articleId: {
      type: Schema.ObjectId,
      ref: "Article",
      required: [true, "comment must belong to an article"],
    },
    content: {
      type: String,
      required: [true, "a comment must include content"],
      maxLength: [2000, "Comment is too big"],
    },
  },
  { timestamps: true }
);

// auto populating on find
articleCommentSchema.pre<Query<unknown, unknown>>(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "fullName avatar _id createdAt updatedAt",
  });

  next();
});

const ArticleCommentModel = model<Comment>(
  "ArticleComment",
  articleCommentSchema
);

export { ArticleCommentModel };
