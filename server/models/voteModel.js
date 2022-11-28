import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
  voteCreatedFor: {
    // The review which this vote was created for (using ObjectId)
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  voteCreatedBy: {
    // The person who voted (username)
    type: String,
    required: true,
  },
  voteType: {
    // Upvote or downvote (Can change to bool)
    type: String,
    required: true,
  },
});

export default mongoose.model("Vote", voteSchema);
