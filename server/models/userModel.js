import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: Number,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userFirstName: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
