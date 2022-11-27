import asyncHandler from "express-async-handler";
import reviewModel from "../models/reviewModel.js";
import Review from "../models/ReviewModel.js";

const createReview = asyncHandler(async (req, res) => {
  const newReview = await Review.create({
    reviewCreatedFor: req.body.reviewCreatedFor,
    reviewCreatedBy: req.body.reviewCreatedBy,
    reviewDifficulty: req.body.reviewDifficulty,
    reviewInfoTags: req.body.reviewInfoTags,
    reviewComment: req.body.reviewComment,
    reviewProfessor: req.body.reviewProfessor,
    reviewIsReported: req.body.reviewIsReported,
    reviewIsDeleted: req.body.reviewIsDeleted,
  });
  const cookieSettings = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    secure: true,
    httpOnly: false,
    sameSite: "lax",
  };
  //res.cookie("reviewName", req.body.ReviewName, cookieSettings); cookie implementation example
  res.status(200).json(newReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  const existingReview = await Review.findById(req.params.id);
  if (!existingReview) {
    res.status(400);
    throw new Error("Review not found.");
  }
  await existingReview.remove();
  res.status(200).json({ id: req.params.id });
});

const getReview = asyncHandler(async (req, res) => {
  //console.log(JSON.stringify(req.params));
  //if (!req.body.reviewReference) {
  // res.status(400);
  //throw new Error("Review Reference not included in request body.");
  // }
  const review = await Review.findOne({
    reviewReference: req.params.reviewReference,
  });
  if (!review) {
    res.status(400);
    throw new Error("Review not found.");
  }
  res.status(200).json({ review });
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(400);
    throw new Error("Review not found.");
  }
  const updatedReview = await reviewModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedReview });
});

export { createReview, deleteReview, getReview, updateReview };
