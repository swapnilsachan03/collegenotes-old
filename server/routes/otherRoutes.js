import express from "express";
import getDashboardStats from "../controllers/otherControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Admin Routes -------------------------------------------------------------------------------------------------------------------

router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;