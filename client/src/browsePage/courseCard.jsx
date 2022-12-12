import { useState, useEffect } from "react";
import { getReviewByCourse } from "../backendhelpers/reviewHelpers";
import { Link } from "react-router-dom";

const RateColor = {
  5: "bg-green-600",
  4: "bg-green-500",
  3: "bg-yellow-500",
  2: "bg-orange-500",
  1: "bg-red-500",
  0: "bg-gray-300",
};
const DifficultyColor = {
    1: "bg-green-600",
    2: "bg-green-500",
    3: "bg-yellow-500",
    4: "bg-orange-500",
    5: "bg-red-500",
    0: "bg-gray-300",
  };

function CourseCard(props) {
  const [courseAvgRating, setCourseAvgRating] = useState(0);
  const [courseAvgDifficulty, setCourseAvgDifficulty] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    // retrieve the information about reviews from the db

    getReviewByCourse(props.courseCode).then(function(result) {
        // store all reviews in "reviews"
        setReviews(result.data.existingReviews);
        // calculate total reviews
        setTotalReviews(result.data.existingReviews.length);

        let score = 0;
        let score1 = 0;
        let nReviews = result.data.existingReviews.length;
        if (nReviews > 0) {
          result.data.existingReviews.map((r) => (score += r.reviewRating));
          result.data.existingReviews.map((r) => (score1 += r.reviewDifficulty));
          setCourseAvgRating(score / nReviews);
          setCourseAvgDifficulty(score1 / nReviews);
        }
    });

  }, []);

  return (
    <Link to={`/courses/${props.courseCode}`}>
        <div className="flex border-0 bg-gray-200 shadow-lg sm:p-10 p-1">

            <div className="flex-col sm:text-xl text-base font-bold basis-1/5 px-1">
                <p>{props.courseCode}</p>
            </div>
            <div className="flex-col sm:text-lg text-sm basis-1/5">
                <p>{props.courseName}</p>
            </div>
            <div className="flex-col basis-1/5">
                <div className={`${RateColor[Math.round(courseAvgRating)]} sm:text-xl text-base w-1/5 py-2 m-auto min-w-max`}>
                    {Math.round(courseAvgRating*10)/10}
                </div>
            </div>
            <div className="flex-col basis-1/5">
                <div className={`${DifficultyColor[Math.round(courseAvgDifficulty)]} sm:text-xl text-base w-1/5 py-2 m-auto min-w-max`}>
                    {Math.round(courseAvgDifficulty*10)/10}
                </div>
            </div>
            <div className="flex-col basis-1/5 sm:text-xl text-base h-full leading-10 text-center">
                <p>{totalReviews}</p>
            </div>
        </div>
    </Link>

  )
  
}

export default CourseCard;