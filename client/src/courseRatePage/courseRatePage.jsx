import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseSearchBox from "../CourseSearchBox";
import {
  CheckCircleIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { getSpecificCourse } from "../backendhelpers/courseHelpers";

function CourseRatePage() {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    getSpecificCourse(id).then((course) =>
      setData(course.data.existingCourses)
    );
  }, [setData]);

  console.log(data);
  return (
    <div className="flex justify-center text-center flex-col font-mono">
      <div className="flex flex-row font-mono py-2 items-center">
        <div className="w-full">
          <img className="ml-4" src={smallRecenseo}></img>
        </div>
        <div className="h-8">
          <CourseSearchBox />
        </div>

        <div className="flex w-full justify-end items-center">
          <div className="flex flex-row gap-3 mr-4">
            <button>Login</button>
            <button className="bg-red-800 rounded-lg p-1 text-yellow-300">
              Sign up
            </button>
          </div>
        </div>
      </div>

      <footer className="flex flex-row bg-red-900 h-12 mt-8">
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
export default CourseRatePage;
