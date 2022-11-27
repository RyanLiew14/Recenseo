import asyncHandler from "express-async-handler";
import reviewModel from "../models/reviewModel.js";
import User from "../models/UserModel.js";

const createUser = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    userName: req.body.UserName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    userFirstName: req.body.userFirstName,
    userLastName: reviewModel.body.userLastName,
    userType: reviewModel.body.userType,
  });
  const cookieSettings = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: false,
    sameSite: "lax",
  };
  //res.cookie("userName", req.body.UserName, cookieSettings); cookie implementation example
  res.status(200).json(newUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    res.status(400);
    throw new Error("User not found.");
  }
  await existingUser.remove();
  res.status(200).json({ id: req.params.id });
});

const getUser = asyncHandler(async (req, res) => {
  //console.log(JSON.stringify(req.params));
  //if (!req.body.userReference) {
  // res.status(400);
  //throw new Error("User Reference not included in request body.");
  // }
  const user = await User.findOne({ userReference: req.params.userReference });
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  res.status(200).json({ user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedUser });
});

export { createUser, deleteUser, getUser, updateUser };
