import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/:id", getUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
