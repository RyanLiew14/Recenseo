import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CourseSearchBox from "./CourseSearchBox";
import {
  CheckCircleIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function App() {
  //instead we'll probably need to hit the courses api and pass the courses as a state to the CourseSearchBox component.
  const baseURL = "http://localhost:5001/api/v1/users";
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => setData(response.data));
  }, []);

  return (
    <div className="flex justify-center text-center flex-col font-mono">
      <div className="flex flex-row font-mono py-2">
        <div className="w-full">
          <img className="ml-4" src={smallRecenseo}></img>
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

      <div className="flex w-full items-center flex-col gap-3 bg-red-300 py-8">
        <img className="flex w-96 h-40 items-center" src={bigRecenseo}></img>
        <p className="mt-12 font-bold font-mono">
          Find a course at the University of Calgary
        </p>
        <CourseSearchBox />
      </div>

      <div className="mt-8 flex flex-col">
        <p className="text-2xl font-bold">
          Recenseo: University of Calgary Course Rater
        </p>
        <p className="mt-4 text-lg">
          The largest online platform for students to share their experiences
          and help other students pick the best courses in their degree.
        </p>
      </div>

      <div className="flex flex-row place-content-evenly mt-16">
        <div className="flex flex-col justify-center items-center">
          <UserGroupIcon className="h-52 w-52" />
          <p>Thousands of reviews, made by real students</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <EyeSlashIcon className="h-52 w-52" />
          <p>Anonymous ratings</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <CheckCircleIcon className="h-52 w-52" />
          <p>Active site moderators ensure all reviews are genuine </p>
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
export default App;
