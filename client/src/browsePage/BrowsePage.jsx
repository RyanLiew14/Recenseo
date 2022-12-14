import smallRecenseo from "./Small recenseo.svg";
import bigRecenseo from "./Big Recenseo.svg";
import { useState, useEffect } from "react";
import SignUpPopup from "../modals/SignUpPopup";
import SignInPopup from "../modals/SignIn";
import CourseCard from "./courseCard";
import Select from "react-select";
import AuthenticationComponents from "../AuthenticationComponents";
import RecenseoLogo from "../RecenseoLogo";
import NavButtons from "../NavButtons";

import { getCourse } from "../backendhelpers/courseHelpers";
import { getUserCookie } from "../backendhelpers/cookieHelpers";
import { Link } from "react-router-dom"


function BrowsePage() {
  const facultyOptions = [
    { value: "", label: "All Faculties" },
    { value: "Arts", label: "Arts" },
    { value: "Science", label: "Science" },
    { value: "Business", label: "Business" },
    { value: "Architecture, Planning and Landscape", label: "Architecture" },
    { value: "Engineering", label: "Engineering" },
    { value: "Nursing", label: "Nursing" },
    { value: "Education", label: "Education" },
  ];
  const levelOptions = [
    {value:"", label:"All Levels"},
    { value: "2", label: "200" },
    { value: "3", label: "300" },
    { value: "4", label: "400" },
    { value: "5", label: "500" },
  ];

  const [data, setData] = useState([]);
  const [cookieData, setCookieData] = useState();
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const [selectedFaculties, setSelectedFaculties] = useState({value:"", label:"All Faculties"});
  const [selectedLevels, setSelectedLevels] = useState({value:"", label:"All Levels"});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [maxItems, setMaxItems] = useState(10);

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
    // TODO: This is only here because im still using CourseSearchBox.jsx component as a place holder for the text box
    // remove when a name search text box is implemented
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

    // retrieve the course list, then perform necessary filtering/sorting
    getCourse().then(function(result) {
      let courseList = result.data.existingCourses;

      // filter by faculty
      if (selectedFaculties.value != "") {
        let temp = courseList.filter((course) => course.courseFaculty === selectedFaculties.value);
        courseList = temp;
      }

      // filter by level
      if (selectedLevels.value != "") {
        let temp = courseList.filter((course) => course.courseName.substring(course.courseName.length - 3, course.courseName.length - 2) === selectedLevels.value);
        courseList = temp;
      }

      // filter by keyword
      if (textInput != "") {
        let temp = courseList.filter((course) => course.courseDepartmentAcronym.toLowerCase().includes(textInput.toLowerCase()) 
        || course.courseNameLong.toLowerCase().includes(textInput.toLowerCase()));
        courseList = temp;
      }

      // after all modifications are applied to courseList, set FilteredCourses to courseList
      setFilteredCourses(
        courseList.filter((item, index) => index < maxItems).map((course => {
          return course;
        }))
        )
      }
    );

    getUserCookie().then((cookie) => setCookieData(cookie));
  }, [selectedFaculties, selectedLevels, textInput, maxItems]);


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
          <RecenseoLogo />
          <NavButtons />
        </div>
        <AuthenticationComponents />
      </div>
      <div className="flex-row sm:w-96 w-72 ml-auto mr-auto left-0 right-0">
          <Link to="/">
          <img src={bigRecenseo}></img>
          </Link>
        </div>
      {/* Desc */}
      <div className="flex-row">
        <p className="sm:text-2xl text-lg font-bold mt-10">
          All University of Calgary Courses
        </p>
      </div>

      {/* Search and filter*/}
      <div className="flex flex-row sm:mx-10 mx-2 mt-8 h-full justify-around">
        <div className="flex flex-row">

          <div className="flex-col px-2">
            <label>Search</label>
            <input
              className="rounded border w-full border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              type="name"
              placeholder="Keyword"
            />
          </div>

          <div className="flex-col px-2">
            <label>Faculty</label>
            <Select
              name="faculties"
              options={facultyOptions}
              value={selectedFaculties}
              onChange={(e) => {
                  setSelectedFaculties(e);
              }}
            />
          </div>

          <div className="flex-col px-2">
            <label>Level</label>
            <Select
              name="level"
              options={levelOptions}
              value={selectedLevels}
              onChange={(e) => {
                  setSelectedLevels(e);
              }}
            />
          </div>

        </div>
        
        {/* <div className="flex-col">
          <Select
            name="sort"
            options={sortOptions}
            value={selectedSort}
            onChange={(e) => {
                setSelectedSort(e);
            }}
          />
        </div> */}

      </div>
      
      <hr className="mt-3 mx-10 h-1 bg-neutral-400"></hr>

      {/* Course list */}
      <div className="flex flex-col sm:m-10 m-1 justify-center border border-neutral-400">

        {/* column names */}
        <div className="flex flex-row my-2 sm:text-lg text-sm font-semibold">
          <p className="flex-col basis-1/5">Code</p>
          <p className="flex-col basis-1/5">Name</p>
          <p className="flex-col basis-1/5">Rating</p>
          <p className="flex-col basis-1/5">Difficulty</p>
          <p className="flex-col basis-1/5">Total Reviews</p>
        </div>

        <hr className="flex-row mx-10"></hr>

        {/* LIST OF COURSES - Formatted as clickable course cards */}
        {/* TODO: Add filter/sort functions */}
        {filteredCourses?.map((course) => (
          <div className="flex-row sm:m-5 mx-1 my-2">
            <CourseCard
              courseCode={course.courseDepartmentAcronym+" "+course.courseName.match(/\d+/g)}
              courseName={course.courseNameLong}
            />
          </div>
        ))}
        
        <button
          className="flex-row justify-center rounded-md border border-transparent bg-neutral-400 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 sm:text-lg w-1/5 mx-auto mb-5"
          onClick={() => setMaxItems(maxItems + 10)}
        >
          Load More
        </button>


      </div>

      {/* TODO: fix footer position when page is filled up later */}
      <footer className="flex flex-row bg-red-900 h-12 mt-8 bottom-0">
        <div className="w-full flex text-white text-xs items-center justify-start">
          <p className="ml-4">
            ?? 2022 Seng 513 - Group 7 Inc. All Rights Reserved
          </p>
        </div>
        <div className="w-full flex text-white items-center justify-end">
          <RecenseoLogo />
        </div>
      </footer>
    </div>

  );
}

export default BrowsePage;