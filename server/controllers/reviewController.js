import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";

const createReview = asyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create({
      reviewCreatedFor: req.body.reviewCreatedFor,
      reviewCreatedBy: req.body.reviewCreatedBy,
      reviewDifficulty: Number(req.body.reviewDifficulty),
      reviewRating: Number(req.body.reviewRating),
      reviewInfoTags: req.body.reviewInfoTags,
      reviewComment: req.body.reviewComment,
      reviewProfessor: req.body.reviewProfessor,
      reviewIsReported: Boolean(req.body.reviewIsReported),
      reviewIsDeleted: Boolean(req.body.reviewIsDeleted),
    });
    res.status(200).json(newReview);
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  
  try {
    console.log(req.params);
    const reviewId = mongoose.Types.ObjectId(req.params.id);
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      res.status(400);
      throw new Error("Review not found.");
    }
    if (existingReview.reviewCreatedBy !== req.body.reviewCreatedBy) {
      res.status(400);
      throw new Error(
        "The review with id " +
          req.params.id +
          " was not created by the user with username " +
          req.body.reviewCreatedBy
      );
    }
    await existingReview.remove();
    res
      .status(200)
      .json({ message: "Removed review with id " + req.params.id });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const getReviewByUser = asyncHandler(async (req, res) => {
  try {
    const existingReviews = await Review.find({
      reviewCreatedBy: req.params.userName,
    });
    if (!existingReviews) {
      res.status(400);
      throw new Error(
        'Reviews for user "' + req.params.userName + '" not found.'
      );
    }
    res.status(200).json({ existingReviews });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const getReviewByCourse = asyncHandler(async (req, res) => {
  try {
    const existingReviews = await Review.find({
      reviewCreatedFor: req.params.courseName,
    });
    if (!existingReviews) {
      res.status(400);
      throw new Error(
        'Reviews for course "' + req.params.courseName + '" not found.'
      );
    }
    res.status(200).json({ existingReviews });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const updateReview = asyncHandler(async (req, res) => {
  try {
    //console.log(req.params);
    const reviewId = mongoose.Types.ObjectId(req.params.id);
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      res.status(400);
      throw new Error("Review with id" + req.params.id + " was not found.");
    }
    if (existingReview.reviewCreatedBy !== req.body.reviewCreatedBy) {
      res.status(400);
      throw new Error(
        "The review with id " +
          req.params.id +
          " was not created by the user with username " +
          req.body.reviewCreatedBy
      );
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    res.status(200).json({ updatedReview });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

export {
  createReview,
  deleteReview,
  getReviewByUser,
  updateReview,
  getReviewByCourse,
};
