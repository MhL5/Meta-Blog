import { ArticleCommentModel } from "../model/articleCommentModel";
import { AppError } from "../utils/appError";
import { catchAsyncMiddleware } from "../utils/catchAsync";

/**
 * Middleware function to check ownership of a comment.
 * 
 * This function checks if the comment belongs to the authenticated user.
 * It first validates the presence of the comment ID in the request parameters.
 * Then, it queries the database to find the comment by ID using the ArticleCommentModel.
 * If the comment is not found, it returns a 404 error using the AppError class.
 * Finally, it compares the user ID of the comment with the authenticated user's ID to verify ownership.
 * If the user IDs do not match, it returns a 403 error using the AppError class.
 */
const checkCommentOwnership = catchAsyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("id is required", 401));

  const comment = await ArticleCommentModel.findById(id).exec();
  if (!comment) return next(new AppError("comment not found", 404));

  if (!(comment?.userId._id.toString() === res.locals.user._id.toString()))
    return next(new AppError("comment does not belong to this user", 403));

  next();
});

export { checkCommentOwnership };
