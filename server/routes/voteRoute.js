import express from "express";
import {
  createVote,
  deleteVote,
  updateVote,
  getVoteByCourse,
} from "../controllers/voteController.js";
import loggedIn from "../middleware/userAuth.js";

const voteRoute = express.Router();

voteRoute.post("/", loggedIn, createVote);
voteRoute.get("/:reviewId", getVoteByCourse);
voteRoute.put("/:id", loggedIn, updateVote);
voteRoute.delete("/:id", loggedIn, deleteVote);

export default voteRoute;
