/**
 * @module
 * This module imports all of the auth handlers and exports them as authController.
 */

import handleLogin from "./handlers/login";
import handleLogout from "./handlers/logout";
import handleRefreshToken from "./handlers/refreshToken";
import handleSignUp from "./handlers/singUp";
import handleVerifyEmail from "./handlers/verifyEmail";

/**
 * adding all of handler to authController
 */
const authController = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleSignUp,
  handleVerifyEmail,
};

/**
 * exporting all of the handlers as authController
 */
export default authController;
