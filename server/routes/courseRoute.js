import express from "express";
import { getCourse } from "../controllers/courseController.js";

const courseRoute = express.Router();

//reviewRoute.post("/", loggedIn, createCourse);
courseRoute.get("/getcourse", getCourse);
//reviewRoute.put("/:id", loggedIn, updateCourse);
//reviewRoute.delete("/:id", loggedIn, deleteCourse);

export default courseRoute;
