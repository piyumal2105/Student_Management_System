import User from "../models/userModel.js";

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
export const getTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" }).select("-password");
  res.json(teachers);
};
