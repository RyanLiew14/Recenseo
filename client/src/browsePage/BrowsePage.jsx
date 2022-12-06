import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseSearchBox from "../CourseSearchBox";
import SignUpPopup from "../modals/SignUpPopup";
import SignInPopup from "../modals/SignIn";

import {
  CheckCircleIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getCourse } from "../backendhelpers/courseHelpers";
import { getUserCookie } from "../backendhelpers/cookieHelpers";


function BrowsePage() {
  const [data, setData] = useState([]);
  const [cookieData, setCookieData] = useState();
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [createReview, setCreateReview] = useState(false);

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
    getUserCookie().then((cookie) => setCookieData(cookie));
  }, [setData, setCookieData]);

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
      <div className="flex flex-row font-mono py-2">
        <div className="w-full">
          <img className="ml-4" src={smallRecenseo}></img>
        </div>

        <div className="flex w-4/6 justify-center">
                <img src={bigRecenseo}></img>
        </div>

        <div className="flex w-full justify-end items-center">
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
      
      {/* Desc */}
      <div className="flex-row">
        <p className="text-2xl font-bold mt-10">
          All University of Calgary Courses
        </p>
      </div>

      {/* Search and filter*/}
      {/* Department and Level search have placeholders for now */}
      <div className="flex flex-row mx-10 mt-8 justify-center">
        <div className="flex-col h-full">
          <CourseSearchBox courses={data} />
        </div>
        
        <div className="flex-col">
          <CourseSearchBox courses={data} />
        </div>

        <div className="flex-col">
          <CourseSearchBox courses={data} />
        </div>
      </div>
      
      <hr className="mt-8 mx-10 h-1 bg-neutral-400"></hr>

      {/* Course list */}
      <div className="flex flex-col m-10  justify-center border border-neutral-400">

        {/* column names */}
        <div className="flex flex-row w-full justify-evenly my-2">
          <p className="flex-col">Code</p>
          <p className="flex-col">Name</p>
          <p className="flex-col">Rating</p>
          <p className="flex-col">Difficulty</p>
          <p className="flex-col">Total Reviews</p>
        </div>

        <hr className="flex-row mx-10"></hr>
        {/* TODO: Add course cards */}
        
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