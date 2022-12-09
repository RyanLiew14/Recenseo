import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseSearchBox from "../CourseSearchBox";
import SignUpPopup from "../modals/SignUpPopup";
import SignInPopup from "../modals/SignIn";
import CourseCard from "./courseCard";
import SortBox from "./SortBox";
import FacultyBox from "./FacultyBox";
import LevelBox from "./LevelBox";

import {
  CheckCircleIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getCourse } from "../backendhelpers/courseHelpers";
import { getUserCookie } from "../backendhelpers/cookieHelpers";
import { Link } from "react-router-dom"


function BrowsePage() {
  const [data, setData] = useState([]);
  const [cookieData, setCookieData] = useState();
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const [allCourses, setAllCourses] = useState();

  const toggleForm = (formName) => {
    if (formName === "login") {
      setSignIn(true);
      setSignUp(false);
    } else if (formName === "register") {
      setSignIn(false);
      setSignUp(true);
    } else {
      setSignIn(false);
      setSignUp(false);
    }
  };

  useEffect(() => {
    getCourse().then((course) =>
      setData(
        course.data.existingCourses.map(
          (course) =>
            course.courseDepartmentAcronym +
            " " +
            course.courseName.match(/\d+/g)
        )
      )
    );
    getCourse().then((course) =>
      setAllCourses(
        course.data.existingCourses.map((course => {
          return course;
        }))
      )
    );
    getUserCookie().then((cookie) => setCookieData(cookie));
  }, [setData, setCookieData]);

  // List of filtered courses that appears on the list


  return (
    <div className="flex justify-center text-center flex-col font-mono">
      
      {/* Pop up modals */}
      {(signUp || signIn || createReview) && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          {signIn && (
            <SignInPopup
              onClick={() => {
                setSignIn(!signIn);
              }}
              onFormSwitch={toggleForm}
            />
          )}
          {signUp && (
            <SignUpPopup
              onClick={() => {
                setSignUp(!signUp);
              }}
              onFormSwitch={toggleForm}
            />
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-row font-mono py-2 justify-between items-center">
        <div className="flex flex-row">
          <Link to="/" className="flex-col">
            <img className="ml-4" src={smallRecenseo}></img>
          </Link>
          <div className="m-auto text-2xl ml-10 hover:bg-neutral-200 h-10 leading-10 rounded-lg">
            <Link to="/" className="p-5">Home</Link>
          </div>
          <div className="m-auto text-2xl ml-10 hover:bg-neutral-200 h-10 leading-10 rounded-lg">
            <Link to="/browse" className="p-5">Browse</Link>
          </div>
        </div>

        <div className="w-96 absolute ml-auto mr-auto left-0 right-0">
          <Link to="/">
          <img src={bigRecenseo}></img>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-3 mr-4">
            <button
              onClick={() => {
                setSignIn(!signIn);
              }}
            >
              Login
            </button>
            <button
              className="bg-red-800 rounded-lg p-1 text-yellow-300"
              onClick={() => {
                setSignUp(!signUp);
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-3 mx-10 h-1 bg-black"></hr>

      {/* Desc */}
      <div className="flex-row">
        <p className="text-2xl font-bold mt-10">
          All University of Calgary Courses
        </p>
      </div>

      {/* Search and filter*/}
      {/* Department and Level search have placeholders for now */}
      <div className="flex flex-row mx-10 mt-8 justify-between">
        <div className="flex flex-row h-full">
          <CourseSearchBox courses={data} className="flex-col"/>
          <FacultyBox className="flex-col"/>
          <LevelBox className="flex-col"/>
        </div>
        
        <div className="flex-col">
          <SortBox />
        </div>

      </div>
      
      <hr className="mt-3 mx-10 h-1 bg-neutral-400"></hr>

      {/* Course list */}
      <div className="flex flex-col m-10  justify-center border border-neutral-400">

        {/* column names */}
        <div className="flex flex-row w-full my-2 text-lg font-semibold">
          <p className="flex-col basis-1/5">Code</p>
          <p className="flex-col basis-1/5">Name</p>
          <p className="flex-col basis-1/5">Rating</p>
          <p className="flex-col basis-1/5">Difficulty</p>
          <p className="flex-col basis-1/5">Total Reviews</p>
        </div>

        <hr className="flex-row mx-10"></hr>

        {/* LIST OF COURSES - Formatted as clickable course cards */}
        {/* TODO: Add filter/sort functions */}
        
        {allCourses?.map((course) => (
          <div className="flex-row m-5">
            <CourseCard
              courseCode={course.courseDepartmentAcronym+" "+course.courseName.match(/\d+/g)}
              courseName={course.courseNameLong}
            />
          </div>
        ))}
        



      </div>

      {/* TODO: fix footer position when page is filled up later */}
      <footer className="flex flex-row bg-red-900 h-12 absolute inset-x-0 bottom-0">
        <div className="w-full flex text-white items-center justify-start">
          <p className="ml-4">
            © 2022 Seng 513 - Group 7 Inc. All Rights Reserved
          </p>
        </div>
        <div className="w-full flex text-white items-center justify-end">
          <img className="h-12 w-12 mr-4" src={smallRecenseo}></img>
        </div>
      </footer>
    </div>
  );
}

export default BrowsePage;