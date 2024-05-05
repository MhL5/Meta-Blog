import { InferSchemaType, Schema, model } from "mongoose";

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

type ArticleLikeSchema = InferSchemaType<typeof articleLikeSchema>;
const ArticleLikeModel = model<ArticleLikeSchema>(
  "ArticleLike",
  articleLikeSchema
);

export { ArticleLikeModel };
/*
// Define a pre-save hook to ensure uniqueness of like per user per article
LikeSchema.pre('save', function(next) {
  const Like = mongoose.model('Like', LikeSchema);
  Like.findOne({ articleId: this.articleId, userId: this.userId }, (err, existingLike) => {
    if (err) {
      return next(err);
    }
    if (existingLike) {
      return next(new Error('You have already liked this article.'));
    }
    next();
  });
});
*/
