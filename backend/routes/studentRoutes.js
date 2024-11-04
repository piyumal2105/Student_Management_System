import express from "express";
import { getStudents, enrollCourse } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all students (optional: restrict to admin)
router.get("/", protect, getStudents);

// Enroll a student to a course
router.post("/:studentId/enroll", protect, enrollCourse);

export default router;
