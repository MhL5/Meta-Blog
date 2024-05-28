import { ArticleModel } from "../model/articleModel";
import * as factory from "./handlerFactory";

const getAllArticles = factory.getAll(ArticleModel);
const createArticle = factory.createOne(ArticleModel);
const getArticle = factory.getOne(ArticleModel);
const deleteArticle = factory.deleteOne(ArticleModel);
const updateArticle = factory.updateOne(ArticleModel);

export {
  getAllArticles,
  createArticle,
  getArticle,
  deleteArticle,
  updateArticle,
};
