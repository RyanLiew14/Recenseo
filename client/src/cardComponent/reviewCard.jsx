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

function ReviewCard(props) {
  const [tags, setTags] = useState();

  useEffect(() => {
    setTags(props.courseTags);
  }, [setTags, props.courseTags]);

  return (
    <div className="flex justify-center">
      <div className="border-0 bg-gray-200 shadow-lg w-full p-4">
        <div className="text-xl flex sm:flex-row flex-col">
          <div className="flex sm:justify-start justify-center w-full">
            <p>{props.courseName}</p>
          </div>
          <div className="text-sm mr-4 flex sm:justify-end justify-center w-full break-all">
            {props.courseProfessor}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col ml-4 mt-3">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p>Quality</p>
              <div
                className={`${
                  CardColor[props.courseRating]
                } text-center text-xl py-2`}
              >
                {props.courseRating}
              </div>
            </div>

            <div className="flex-flex-col">
              <p>Difficulty</p>
              <div
                className={`${
                  CardColor[props.courseDifficulty]
                } text-center text-xl py-2`}
              >
                {props.courseDifficulty}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-8/12 text-xs ml-8 mt-4">
            <p className="sm:text-left break-all">{props.courseComment}</p>
            <div className="flex sm:flex-row flex-col sm:space-x-4 space-y-4 mt-8">
              {tags?.map((tag) => (
                <div className="bg-gray-400 p-1">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReviewCard;
