import { Schema } from "mongoose";

const articleLikeSchema = new Schema(
  {
    // articleId:
    // userId:
  },
  { timestamps: true }
);

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
