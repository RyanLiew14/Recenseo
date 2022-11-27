import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import playerRoute from "./routes/playerRoute.js";
import gameRoute from "./routes/gameRoute.js";
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
app.use("/api/users", playerRoute);
app.use("/api/reviews", gameRoute);
app.use("/api/votes", gameRoute);

app.get(
  "/api/getPlayerCookie",
  asyncHandler(async (req, res) => {
    /*res.send({
      playerName: req.cookies.playerName,
      playerNumber: req.cookies.playerNumber,
      gameReference: req.cookies.gameReference,
    });*/
  })
);

app.get(
  "/api/deletePlayerCookie",
  asyncHandler(async (req, res) => {
    /*res.clearCookie("playerName");
    res.clearCookie("playerNumber");
    res.clearCookie("gameReference");
    res.send("Cookies have been deleted.");*/
  })
);

app.listen(port, () => console.log("Server started on port " + port));
