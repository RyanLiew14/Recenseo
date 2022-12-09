import express from "express";
import { getCourse, getSpecificCourse } from "../controllers/courseController.js";

const courseRoute = express.Router();

//reviewRoute.post("/", loggedIn, createCourse);
courseRoute.get("/getcourse", getCourse);
courseRoute.get("/getspecificcourse/:id", getSpecificCourse);
//reviewRoute.put("/:id", loggedIn, updateCourse);
//reviewRoute.delete("/:id", loggedIn, deleteCourse);

export default courseRoute;
