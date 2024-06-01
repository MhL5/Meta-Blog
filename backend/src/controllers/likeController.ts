import { ArticleLikeModel } from "../model/articleLikeModel";
import { AppError } from "../utils/appError";
import { catchAsyncMiddleware } from "../utils/catchAsync";

const toggleLike = catchAsyncMiddleware(async (req, res, next) => {
  const { articleId } = req.body;
  const userId = res.locals.user._id.toString();

  if (!articleId) return next(new AppError("articleId is required", 401));

  const like = await ArticleLikeModel.findOne({ articleId, userId }).exec();

  if (like) {
    await ArticleLikeModel.deleteOne({ articleId, userId });
    return res.status(204).json({ status: "success", message: "like removed" });
  }

  await ArticleLikeModel.create({ articleId, userId });
  res.status(201).json({ status: "success", message: "like added" });
});

export { toggleLike };
