import smallRecenseo from "./Small recenseo.svg";
import { useState, useEffect } from "react";
import CourseSearchBox from "../CourseSearchBox";
import { useParams } from "react-router-dom";
import { getCourse } from "../backendhelpers/courseHelpers";
import { getReviewByCourse } from "../backendhelpers/reviewHelpers";
import ReviewCard from "../cardComponent/reviewCard";
import AddReview from "../modals/addReviewModal";
import { getUserCookie } from "../backendhelpers/cookieHelpers";

function CourseRatePage() {
  const [allCourses, setAllCourses] = useState();
  const [reviews, setReviews] = useState();
  const [reviewAdded, setReviewAdded] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const { id } = useParams();
  const [authToken, setAuthToken] = useState(false);

  useEffect(() => {
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
    getUserCookie().then((cookie) => {
      setAuthToken(cookie.data.userAuth);
    });
    getReviewByCourse(id, authToken).then((review) =>
      setReviews(review.data.existingReviews)
    );
    setReviewAdded(false);
  }, [id, reviewAdded, authToken]);

  let score = 0;
  let averageScore = 0;
  if (reviews?.length > 0) {
    reviews.forEach((review) => (score += review.reviewRating));
    averageScore = score / reviews.length;
  }
  return (
    <div className="flex justify-center text-center flex-col font-mono">
      {addReview && (
        <AddReview
          courseName={id}
          setAddReview={setAddReview}
          setReviewAdded={setReviewAdded}
        />
      )}
      <div className="flex sm:flex-row flex-col font-mono py-2 items-center">
        <div className="flex w-full sm:justify-start justify-center">
          <img
            className="sm:ml-4 sm:mb-0 mb-4 h-16 w-16"
            src={smallRecenseo}
          ></img>
        </div>
        <div className="h-8">
          <CourseSearchBox courses={allCourses} />
        </div>

        <div className="flex w-full sm:justify-end items-center justify-center sm:mt-0 mt-4">
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
            {averageScore.toFixed(1)}/<p className="text-4xl">5</p>
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

      <div className="w-full flex justify-center">
        <div className="flex flex-col w-8/12 mt-4 space-y-4">
          {reviews?.map((review) => (
            <ReviewCard
              courseTags={review.reviewInfoTags}
              courseRating={review.reviewRating}
              courseDifficulty={review.reviewDifficulty}
              courseProfessor={review.reviewProfessor}
              courseComment={review.reviewComment}
              courseName={id}
            />
          ))}
        </div>
      </div>

      <footer className="flex flex-row bg-red-900 h-12 mt-8 w-full fixed bottom-0">
        <div className="w-full flex text-white text=xs items-center justify-start">
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
