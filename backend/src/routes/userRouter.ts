import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/verify-email/:token").get(authController.verifyEmail);
;
export default router;
