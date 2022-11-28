import express from "express";
import loggedIn from "../middleware/userAuth.js";

import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getUser);
userRoute.put("/", loggedIn, updateUser);
userRoute.delete("/", loggedIn, deleteUser);

export default userRoute;
