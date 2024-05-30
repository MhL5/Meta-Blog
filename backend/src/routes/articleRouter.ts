import express from "express";
import * as articleController from "../controllers/articleController";
import * as commentController from "../controllers/commentController";
import { protect } from "../middlewares/protect";

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

/**
 * Protecting comment route from un authorized access
 */
router.use(protect);
router.route("/comments").post(commentController.createComment);

router
  .route("/comments/:id")
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

export default router;
