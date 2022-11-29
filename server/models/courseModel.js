import mongoose from "mongoose";

// Basically just read information for the courses
const courseSchema = mongoose.Schema({
  courseDepartment: {
    // "Computer Science"
    type: String,
    required: true,
  },
  courseDepartmentAcronym: {
    // "CPSC"
    type: String,
    required: true,
  },
  courseFaculty: {
    // "Science"
    type: String,
    required: true,
  },
  courseName: {
    // "Computer Science 217"
    type: String,
    required: true,
  },
  courseNameLong: {
    // "Introduction to Computer Science for Multidisciplinary Studies 1"
    type: String,
    required: true,
  },
  courseDescription: {
    //"Introduction to problem solving, analysis and design of small-scale computational systems and
    // implementation using a procedural programming language. For students wishing to combine studies
    // in computer science with studies in other disciplines."
    type: String,
    required: true,
  },
  courseUnits: {
    // 3
    type: Number,
    required: true,
  },
  courseIsDeleted: {
    // default false
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Course", courseSchema);
