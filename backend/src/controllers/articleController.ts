import { ArticleModel } from "../model/articleModel";
import * as factory from "./handlerFactory";

const getAllArticles = factory.getAll(ArticleModel, {
  path: "articleComments articleLikes articleViews",
  select: "-__v -ipAddress",
});
const createArticle = factory.createOne(ArticleModel);
const getArticle = factory.getOne(ArticleModel, {
  path: "articleComments articleLikes articleViews",
  select: "-__v -ipAddress",
});
const deleteArticle = factory.deleteOne(ArticleModel);
const updateArticle = factory.updateOne(ArticleModel);

export {
  getAllArticles,
  createArticle,
  getArticle,
  deleteArticle,
  updateArticle,
};
