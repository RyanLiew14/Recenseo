import asyncHandler from "express-async-handler";
import reviewModel from "../models/reviewModel.js";
import Vote from "../models/VoteModel.js";

const createVote = asyncHandler(async (req, res) => {
  const newVote = await Vote.create({
    voteCreatedFor: req.body.voteCreatedFor,
    voteCreatedBy: req.body.voteCreatedBy,
    voteType: req.body.voteType,
  });
  const cookieSettings = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    secure: true,
    httpOnly: false,
    sameSite: "lax",
  };
  //res.cookie("voteName", req.body.VoteName, cookieSettings); cookie implementation example
  res.status(200).json(newVote);
});

const deleteVote = asyncHandler(async (req, res) => {
  const existingVote = await Vote.findById(req.params.id);
  if (!existingVote) {
    res.status(400);
    throw new Error("Vote not found.");
  }
  await existingVote.remove();
  res.status(200).json({ id: req.params.id });
});

const getVote = asyncHandler(async (req, res) => {
  //console.log(JSON.stringify(req.params));
  //if (!req.body.voteReference) {
  // res.status(400);
  //throw new Error("Vote Reference not included in request body.");
  // }
  const vote = await Vote.findOne({ voteReference: req.params.voteReference });
  if (!vote) {
    res.status(400);
    throw new Error("Vote not found.");
  }
  res.status(200).json({ vote });
});

const updateVote = asyncHandler(async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  if (!vote) {
    res.status(400);
    throw new Error("Vote not found.");
  }
  const updatedVote = await voteModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedVote });
});

export { createVote, deleteVote, getVote, updateVote };
