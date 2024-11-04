import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new course
router.post("/", protect, createCourse);

// Get all courses
router.get("/", getCourses);

// Get course by ID
router.get("/:id", getCourseById);

// Update a course
router.put("/:id", protect, updateCourse);

// Delete a course
router.delete("/:id", protect, deleteCourse);

export default router;
