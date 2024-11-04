import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    homework: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Homework",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
