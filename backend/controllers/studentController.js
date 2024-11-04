import User from "../models/userModel.js";
import Course from "../models/courseModel.js";

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
export const getStudents = async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json(students);
};

// @desc    Enroll student to a course
// @route   POST /api/students/:studentId/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: "Course or Student not found" });
    }

    if (course.studentsEnrolled.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student already enrolled in this course" });
    }

    course.studentsEnrolled.push(studentId);
    await course.save();

    res.json({ message: "Student enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
