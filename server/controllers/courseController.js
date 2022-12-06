import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import mongoose from "mongoose";

/*const createCourse = asyncHandler(async (req, res) => {
  try {
    const newCourse = await Course.create({

    });
    res.status(200).json(newCourse);
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId(req.params.id);
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      res.status(400);
      throw new Error("Course with id" + req.params.id + " not found.");
    }
    await existingCourse.remove();
    res
      .status(200)
      .json({ message: "Removed course with id " + req.params.id });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});*/

const getCourse = asyncHandler(async (req, res) => {
  try {
    const existingCourses = await Course.find({})
    console.log(existingCourses)
    if (!existingCourses) {
      res.status(400);
      throw new Error("No courses were found.");
    }
    res.status(200).json({ existingCourses });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});

/*const updateCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId(req.params.id);
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      res.status(400);
      throw new Error("Course with id " + req.params.id + " not found.");
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ updatedCourse });
  } catch (error) {
    const errMessage = error.message;
    res.status(400).json(errMessage);
  }
});*/

export { getCourse };
