import express from "express";
import { addToBookmarks, addToFavorites, changePassword, changeUserRole, deleteMyProfile, deleteUser, forgotPassword, getAllUsers, getMyProfile, login, logout, register, removeFromBookmarks, removeFromFavorites, resetPassword, updateProfile } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(isAuthenticated, logout);

// Forgot password
router.route("/forgotPassword").post(forgotPassword);

// Reset password
router.route("/resetPassword/:token").put(resetPassword);

// Get, update & delete profile
router.route("/profile")
  .get(isAuthenticated, getMyProfile)
  .put(isAuthenticated, singleUpload, updateProfile)
  .delete(isAuthenticated, deleteMyProfile);

// Add & remove bookmarks
router.route("/bookmarks")
  .post(isAuthenticated, addToBookmarks)
  .delete(isAuthenticated, removeFromBookmarks);

// Add & remove favorites
router.route("/favorites")
  .post(isAuthenticated, addToFavorites)
  .delete(isAuthenticated, removeFromFavorites);

// Change password
router.route("/changePassword").put(isAuthenticated, changePassword);

// Admin Routes ------------------------------------------------------------------------------------------------------------------

router.route("/admin/getAllUsers").get(isAuthenticated, authorizeAdmin, getAllUsers)

router
  .route("/admin/user/:_id")
  .put(isAuthenticated, authorizeAdmin, changeUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser)

export default router;