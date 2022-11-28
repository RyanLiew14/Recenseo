import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
  getReviewByUser,
  getReviewByCourse,
} from "../controllers/reviewController.js";

import loggedIn from "../middleware/userAuth.js";

const reviewRoute = express.Router();

reviewRoute.post("/createreview", createReview);
reviewRoute.get("/getuserreview/:userName", loggedIn, getReviewByUser);
reviewRoute.get("/getcoursereview/:courseName", getReviewByCourse);
reviewRoute.put("/:id", loggedIn, updateReview);
reviewRoute.delete("/:id", loggedIn, deleteReview);

export default reviewRoute;
