import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import voteRoute from "./routes/voteRoute.js";
import courseRoute from "./routes/courseRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import asyncHandler from "express-async-handler";
import cookie from "cookie";

dotenv.config();

connectMongoDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/votes", voteRoute);
app.use("/api/courses", courseRoute);

app.get(
  "/api/getUserCookie",
  asyncHandler(async (req, res) => {
    res.send({
      userAuth: req.cookies.userAuth,
    });
  })
);

app.get(
  "/api/deleteUserCookie",
  asyncHandler(async (req, res) => {
    res.clearCookie("userAuth");
    res.send("Cookies have been deleted.");
  })
);

app.listen(port, () => console.log("Server started on port " + port));
