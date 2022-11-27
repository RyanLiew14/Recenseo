import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  reviewCreatedBy: {
    // Created by a user
    type: String,
    required: true,
  },
  reviewCreatedFor: {
    // Created for a course
    type: String,
    required: true,
  },
  reviewDifficulty: {
    type: Number,
    required: true,
  },
  reviewInfoTags: {
    // JSON of info tags as a string []
    type: [String],
    required: true,
  },
  reviewComment: {
    // Free text section of the review
    type: String,
    required: true,
  },
  reviewProfessor: {
    // The professor the student attended the course with
    type: String,
    required: true,
  },
  reviewIsReported: {
    // If the review has been reported by someone, flag the review on the UI
    type: String,
    required: true,
  },
  reviewIsDeleted: {
    // Soft delete for the reviews
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Review", reviewSchema);
