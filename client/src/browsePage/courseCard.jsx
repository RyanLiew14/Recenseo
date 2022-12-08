import { useState, useEffect } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const CardColor = {
  5: "bg-green-600",
  4: "bg-green-500",
  3: "bg-yellow-500",
  2: "bg-orange-500",
  1: "bg-red-500",
};

function CourseCard() {
  //no backend connection, only placeholders for now
  const [classCode, setClassCode] = useState("SENG 513");
  const [className, setClassName] = useState("Web Based Systems");
  const [courseAvgRating, setCourseAvgRating] = useState(5);
  const [courseAvgDifficulty, setCourseAvgDifficulty] = useState(5);
  const [totalReviews, setTotalReviews] = useState(130);
  
  return (
    <div className="flex justify-evenly border-0 bg-gray-200 shadow-lg p-10">

        <div className="flex-col text-xl font-bold">
            <p>{classCode}</p>
        </div>
        <div className="flex-col text-lg">
            <p>{className}</p>
        </div>
        <div className="flex-col">
            <div className={`${CardColor[courseAvgRating]} text-center text-xl py-2 px-10`}>
                {courseAvgRating}
            </div>
        </div>
        <div className="flex-col">
            <div className={`${CardColor[courseAvgDifficulty]} text-center text-xl py-2 px-10`}>
                {courseAvgDifficulty}
            </div>
        </div>
        <div className="flex-col">
            <p>{totalReviews}</p>
        </div>



    </div>

  )
  
}

export default CourseCard;