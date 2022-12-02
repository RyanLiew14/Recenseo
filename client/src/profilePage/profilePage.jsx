import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseSearchBox from "../CourseSearchBox";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function ProfilePage() {
  //instead we'll probably need to hit the courses api and pass the courses as a state to the CourseSearchBox component.
  const baseURL = "http://localhost:5001/api/v1/users";
  const [data, setData] = useState(null);
  const [tabState, setTabState] = useState("baseInfo");
  {
    /*we probably query the db to get this info and put it in the state, and we set the state we probably make an update api call to the user collection*/
  }
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Placeholder");
  const [lastName, setLastName] = useState("Placeholder");
  const [degree, setDegree] = useState("Placeholder");
  const [major, setMajor] = useState("Placeholder");
  const [email, setEmail] = useState("Placeholder");
  const [password, setPassword] = useState("Placeholder");

  useEffect(() => {
    axios.get(baseURL).then((response) => setData(response.data));
  }, []);

  return (
    <div className="flex justify-center text-center flex-col font-mono">
      <div className="flex flex-row bg-red-900 h-12">
        <div className="w-full flex text-white items-center justify-start">
          <img className="h-12 w-12 mr-4" src={smallRecenseo}></img>
        </div>
        <div className="w-full flex text-white items-center justify-end mr-4">
          <UserCircleIcon className="h-12 w-12 mr-4"></UserCircleIcon>
          <p> Placeholder</p>
        </div>
      </div>

      <div className="flex flex-row items-center ml-16 mt-24">
        <UserCircleIcon className="h-36 w-36"></UserCircleIcon>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">Placeholder</p>
          <p className="text-lg font-thin">Degree</p>
        </div>
      </div>

      <hr className="my-4 mx-auto w-11/12 h-1 bg-gray-100 rounded md:my-10 dark:bg-gray-700"></hr>

      <div className="justify-center flex flex-row gap-12">
        <p
          className="hover:underline hover:cursor-pointer"
          onClick={() => setTabState("baseInfo")}
        >
          Basic Information
        </p>
        <p
          className="hover:underline hover:cursor-pointer"
          onClick={() => setTabState("accountSettings")}
        >
          Account Settings
        </p>
        <p
          className="hover:underline hover:cursor-pointer"
          onClick={() => setTabState("ratings")}
        >
          Ratings
        </p>
      </div>

      {tabState === "baseInfo" && (
        <div className="flex justify-center">
          <div className="text-left flex flex-col mt-12 space-y-4">
            <span>
              First Name:&nbsp;
              {editMode ? (
                <input
                  type="text"
                  placeholder={`${firstName}`}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              ) : (
                firstName
              )}
            </span>
            <span>
              Last Name:&nbsp;
              {editMode ? (
                <input
                  type="text"
                  placeholder={`${lastName}`}
                  onChange={(event) => setLastName(event.target.value)}
                />
              ) : (
                lastName
              )}
            </span>
            <span>
              Degree Stream:&nbsp;
              {editMode ? (
                <input
                  type="text"
                  placeholder={`${degree}`}
                  onChange={(event) => setDegree(event.target.value)}
                />
              ) : (
                degree
              )}
            </span>
            <span>
              Major:&nbsp;
              {editMode ? (
                <input
                  type="text"
                  placeholder={`${major}`}
                  onChange={(event) => setMajor(event.target.value)}
                />
              ) : (
                major
              )}
            </span>
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            {editMode && (
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}

      {tabState === "accountSettings" && (
        <div className="flex justify-center">
          <div className="text-left flex flex-col mt-12 space-y-4">
            <span>
              Email:&nbsp;
              {editMode ? (
                <input
                  type="text"
                  placeholder={`${email}`}
                  onChange={(event) => setEmail(event.target.value)}
                />
              ) : (
                email
              )}
            </span>
            <span className="flex flex-row">
              Password:&nbsp;
              {editMode ? (
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              ) : (
                <p> ******* </p>
              )}
            </span>
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            {editMode && (
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}

      {tabState === "ratings" && (
        <div className="flex justify-center">
          {/** PROBABLY THE CARD COMPONENT FOR RATINGS HERE */}
          <div className="text-left flex flex-col mt-12 space-y-4">
            CARD COMPONENT RATINGS
          </div>
        </div>
      )}

      <footer className="flex flex-row bg-red-900 h-12 mt-8 w-full fixed bottom-0">
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
export default ProfilePage;
