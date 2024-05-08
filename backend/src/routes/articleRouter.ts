import express from "express";
import * as articleController from "../controllers/articleController";

const router = express.Router();

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(articleController.createArticle);

router
  .route("/:id")
  .get(articleController.getArticle)
  .delete(articleController.deleteArticle)
  .patch(articleController.updateArticle);

export default router;
