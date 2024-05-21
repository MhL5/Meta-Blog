import express from "express";
import * as authController from "../controllers/authControllers/authController";
import { handleRefreshToken } from "../controllers/authControllers/refreshTokenController";

const router = express.Router();

router.route("/refresh").get(handleRefreshToken);
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/verify-email/:token").get(authController.verifyEmail);

export default router;
