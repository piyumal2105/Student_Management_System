import express from "express";
import { getTeachers } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all teachers
router.get("/", protect, getTeachers);

export default router;
