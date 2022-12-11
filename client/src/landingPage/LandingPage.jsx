import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import CourseSearchBox from "../CourseSearchBox";
import SignUpPopup from "../modals/SignUpPopup";

import SignInPopup from "../modals/SignIn";
import LogoutPopup from "../modals/LogoutPopup";
import Dropdown from "../dropdownmenu/Dropdown";
import profileFill from "../svg/person-fill.svg";
import downArrow from "../svg/chevron-down.svg";
import { Link } from "react-router-dom";

import {
  CheckCircleIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import AuthenticationComponents from "../AuthenticationComponents";
import RecenseoLogo from "../RecenseoLogo";

function LandingPage() {
  return (
    <div className="flex justify-center text-center flex-col font-mono">
      <div className="w-full flex items-center">
        <div className="w-full">
          <RecenseoLogo />
        </div>

        <AuthenticationComponents />
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
        <div className="w-full flex text-white text-xs items-center justify-start">
          <p className="ml-4">
            © 2022 Seng 513 - Group 7 Inc. All Rights Reserved
          </p>
        </div>
        <div className="w-full flex text-white items-center justify-end">
          <RecenseoLogo />
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;
