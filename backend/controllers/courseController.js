import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Teacher
export const createCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;

  if (!title || !description || !teacherId) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== "teacher") {
    return res.status(400).json({ message: "Invalid teacher ID" });
  }

  const course = await Course.create({
    title,
    description,
    teacher: teacherId,
  });

  res.status(201).json(course);
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  const courses = await Course.find().populate("teacher", "name email");
  res.json(courses);
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    "teacher",
    "name email"
  );

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Teacher
export const updateCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;

    if (teacherId) {
      const teacher = await User.findById(teacherId);
      if (teacher && teacher.role === "teacher") {
        course.teacher = teacherId;
      } else {
        return res.status(400).json({ message: "Invalid teacher ID" });
      }
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Teacher
export const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: "Course removed" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
