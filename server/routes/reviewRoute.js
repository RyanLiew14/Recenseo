import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
  getReview,
} from "../controllers/ReviewController.js";

const reviewRoute = express.Router();

reviewRoute.post("/", createReview);
reviewRoute.get("/:id", getReview);
reviewRoute.put("/:id", updateReview);
reviewRoute.delete("/:id", deleteReview);

export default reviewRoute;
