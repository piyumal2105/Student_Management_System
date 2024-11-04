import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadProfilePicture } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Register Route with profile picture upload
router.post(
  "/register",
  uploadProfilePicture.single("profilePicture"),
  registerUser
);

// Login Route
router.post("/login", loginUser);

// Get User Profile
router.get("/profile", protect, getUserProfile);

export default router;
