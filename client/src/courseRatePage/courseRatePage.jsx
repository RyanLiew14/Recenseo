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
import { getCourse } from "../backendhelpers/courseHelpers";
import { getSpecificCourse } from "../backendhelpers/courseHelpers";
import { getReviewByCourse } from "../backendhelpers/reviewHelpers";
import ReviewCard from "../cardComponent/reviewCard";
import AddReview from "../modals/addReviewModal";
import { getUserCookie } from "../backendhelpers/cookieHelpers";

function CourseRatePage() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [allCourses, setAllCourses] = useState();
  const [reviews, setReviews] = useState();
  const [averageScore, setAverageScore] = useState();
  const [addReview, setAddReview] = useState(false);
  const [cookieData, setCookieData] = useState();
  const { id } = useParams();

  useEffect(() => {
    getSpecificCourse(id).then((course) =>
      setSelectedCourse(course.data.existingCourses)
    );
    getCourse().then((course) =>
      setAllCourses(
        course.data.existingCourses.map(
          (course) =>
            course.courseDepartmentAcronym +
            " " +
            course.courseName.match(/\d+/g)
        )
      )
    );
    getReviewByCourse(id).then((review) =>
      setReviews(review.data.existingReviews)
    );

    let score = 0;
    if (reviews?.length > 0) {
      reviews.map((review) => (score += review.reviewRating));
      setAverageScore(score / reviews.length);
    }
    getUserCookie().then((cookie)=> setCookieData(cookie))
  }, [
    setSelectedCourse,
    setAllCourses,
    setReviews,
    setAverageScore,
    reviews,
    id,
  ]);

  console.log(cookieData)

  return (
    <div className="flex justify-center text-center flex-col font-mono">
      {addReview && <AddReview courseName={id} setAddReview={setAddReview} />}
      <div className="flex flex-row font-mono py-2 items-center">
        <div className="w-full">
          <img className="ml-4" src={smallRecenseo}></img>
        </div>
        <div className="h-8">
          <CourseSearchBox courses={allCourses} />
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

      <div className="flex text-center justify-center">
        {reviews?.length > 0 ? (
          <span className="text-7xl font-bold flex flex-row text-center">
            {averageScore}/<p className="text-4xl">5</p>
          </span>
        ) : (
          <p className="text-2xl font-bold flex flex-row text-center mb-12">
            No reviews exist!
          </p>
        )}
      </div>

      <div className="text-4xl font-bold">{id}</div>

      <div className="w-full flex justify-center mt-4">
        <button
          onClick={() => setAddReview(true)}
          className="w-32 bg-red-800 text-yellow-300 rounded-md"
        >
          Add review
        </button>
      </div>

      <div className="flex flex-row justify-center w-full mt-4">
        {reviews?.map((review) => (
          <ReviewCard
            courseTags={review.reviewInfoTags}
            courseRating={review.reviewRating}
            courseDifficulty={review.reviewDifficulty}
            courseComment={review.reviewComment}
            courseName={id}
          />
        ))}
      </div>

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
export default CourseRatePage;
