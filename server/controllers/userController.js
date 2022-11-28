import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const { SECRET = "secret" } = process.env;

const createUser = asyncHandler(async (req, res) => {
  try {
    hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

    const newUser = await User.create({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
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
  } catch (error) {
    res.status(400).json({ error });
  }
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
  try {
    if (!req.body.userName) {
      res.status(400);
      throw new Error("userName not included in request body.");
    }
    const user = await User.findOne({
      userName: req.params.userName,
    });
    if (!user) {
      res.status(400);
      throw new Error("User not found.");
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedUser });
});

export { createUser, deleteUser, getUser, updateUser };
