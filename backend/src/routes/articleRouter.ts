import express from "express";
import * as articleController from "../controllers/articleController";
import * as commentController from "../controllers/commentController";
import { protect } from "../middlewares/protect";
import { checkCommentOwnership } from "../middlewares/checkCommentOwnership";

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
  .patch(checkCommentOwnership, commentController.updateComment)
  .delete(checkCommentOwnership, commentController.deleteComment);

export default router;
