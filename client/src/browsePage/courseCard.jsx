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
    5: "bg-green-600",
    4: "bg-green-500",
    3: "bg-yellow-500",
    2: "bg-orange-500",
    1: "bg-red-500",
    0: "bg-gray-300",
  };

function CourseCard(props) {
  const [courseAvgRating, setCourseAvgRating] = useState(0);
  const [courseAvgDifficulty, setCourseAvgDifficulty] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  // does not work, returns a Promise { <pending> } instead
//   const reviews = [];
//   const totalReviews = 0;

  useEffect(() => {

    getReviewByCourse(props.courseCode).then(function(result) {
        setReviews(result.data.existingReviews);
        setTotalReviews(result.data.existingReviews.length);
    });
    let score = 0;
    let score1 = 0;
    if (reviews?.length > 0) {
      reviews.map((review) => (score += review.reviewRating));
      reviews.map((review) => (score1 += review.reviewDifficulty));
      setCourseAvgRating(score / reviews.length);
      setCourseAvgDifficulty(score1 / reviews.length);
    }
  }, [reviews]);

  return (
    <Link to={`/courses/${props.courseCode}`}>
        <div className="flex border-0 bg-gray-200 shadow-lg p-10">

            <div className="flex-col text-xl font-bold basis-1/5">
                <p>{props.courseCode}</p>
            </div>
            <div className="flex-col text-lg basis-1/5">
                <p>{props.courseName}</p>
            </div>
            <div className="flex-col basis-1/5">
                <div className={`${RateColor[Math.round(courseAvgRating)]} text-xl w-1/5 py-2 m-auto min-w-max`}>
                    {Math.round(courseAvgRating*10)/10}
                </div>
            </div>
            <div className="flex-col basis-1/5">
                <div className={`${DifficultyColor[Math.round(courseAvgDifficulty)]} text-xl w-1/5 py-2 m-auto min-w-max`}>
                    {Math.round(courseAvgDifficulty*10)/10}
                </div>
            </div>
            <div className="flex-col basis-1/5 text-xl">
                <p>{totalReviews}</p>
            </div>
        </div>
    </Link>

  )
  
}

export default CourseCard;