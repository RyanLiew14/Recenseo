import asyncHandler from "express-async-handler";
import Vote from "../models/VoteModel.js";
import mongoose from "mongoose";

const createVote = asyncHandler(async (req, res) => {
  try {
    const newVote = await Vote.create({
      voteCreatedFor: req.body.voteCreatedFor,
      voteCreatedBy: req.body.voteCreatedBy,
      voteType: req.body.voteType,
      voteIsDeleted: Boolean(req.body.voteIsDeleted),
    });
    res.status(200).json(newVote);
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const deleteVote = asyncHandler(async (req, res) => {
  try {
    const voteId = mongoose.Types.ObjectId(req.params.id);
    const existingVote = await Vote.findById(voteId);
    if (!existingVote) {
      res.status(400);
      throw new Error("Vote with id" + req.params.id + " not found.");
    }
    if (existingVote.voteCreatedBy !== req.body.voteCreatedBy) {
      res.status(400);
      throw new Error(
        "The vote with id " +
          req.params.id +
          " was not created by the user with username " +
          req.body.voteCreatedBy
      );
    }
    await existingVote.remove();
    res.status(200).json({ message: "Removed vote with id " + req.params.id });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const getVoteByCourse = asyncHandler(async (req, res) => {
  try {
    const existingVotes = await Vote.find({
      voteCreatedFor: req.params.reviewId,
    });
    if (!existingVotes) {
      res.status(400);
      throw new Error(
        "No votes were found for the vote with id: " + req.params.reviewId
      );
    }
    res.status(200).json({ existingVotes });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const updateVote = asyncHandler(async (req, res) => {
  try {
    const voteId = mongoose.Types.ObjectId(req.params.id);
    const existingVote = await Vote.findById(voteId);
    if (!existingVote) {
      res.status(400);
      throw new Error("Vote with id " + req.params.id + " not found.");
    }
    const updatedVote = await Vote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedVote });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

export { createVote, deleteVote, getVoteByCourse, updateVote };
