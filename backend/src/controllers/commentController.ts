import { ArticleCommentModel } from "../model/articleCommentModel";
import * as factory from "./handlerFactory";

const createComment = factory.createOne(ArticleCommentModel);
const deleteComment = factory.deleteOne(ArticleCommentModel);
const updateComment = factory.updateOne(ArticleCommentModel);

export { createComment, deleteComment, updateComment };
