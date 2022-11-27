import express from "express";
import {
  createVote,
  deleteVote,
  updateVote,
  getVote,
} from "../controllers/voteController.js";

const voteRoute = express.Router();

voteRoute.post("/", createVote);
voteRoute.get("/:id", getVote);
voteRoute.put("/:id", updateVote);
voteRoute.delete("/:id", deleteVote);

export default voteRoute;
