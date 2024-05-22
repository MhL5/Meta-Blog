import express from "express";
import authController from "../controllers/authControllers/authController";

const router = express.Router();

router.route("/refresh").get(authController.handleRefreshToken);
router.route("/signup").post(authController.handleSignUp);
router.route("/login").post(authController.handleLogin);
router.route("/logout").get(authController.handleLogout);
router.route("/verify-email/:token").get(authController.handleVerifyEmail);

export default router;
