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

function ReviewCard() {
  //WE CALL THE API, AND SET THE STATE OF EACH STATE TO THE INFO WE NEED FROM THE DB
  const [tags, setTags] = useState(["tag1", "tag2"]);
  const [courseQuality, setCourseQuality] = useState(5);
  const [courseDifficulty, setCourseDifficulty] = useState(5);
  const [courseDescription, setCourseDescription] = useState(
    "Extremely fun and interesting course! We learned about javascript in class and there are many opportunities for bonus marks during lectures"
  );
  const [className, setClassName] = useState("SENG 513");
  const [date, setDate] = useState(new Date());
  //instead we'll probably need to hit the courses api and pass the courses as a state to the CourseSearchBox component.

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="border-0 bg-gray-200 shadow-lg w-10/12 p-4">
        <div className="text-xl flex flex-row">
          <div className="flex justify-start w-full">
            <p>{className}</p>
          </div>
          <div className="text-sm mr-4 flex justify-end w-full">
            <p>{date.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-row ml-4 mt-3">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p>Quality</p>
              <div
                className={`${CardColor[courseQuality]} text-center text-xl py-2`}
              >
                {courseQuality}
              </div>
            </div>

            <div className="flex-flex-col">
              <p>Difficulty</p>
              <div
                className={`${CardColor[courseDifficulty]} text-center text-xl py-2`}
              >
                {courseDifficulty}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-8/12 text-xs ml-8 mt-4">
            <p>
              Extremely fun and interesting course! We learned about javascript
              in class and there are many opportunities for bonus marks during
              lectures!
            </p>
            <div className="flex flex-row space-x-4 mt-8">
              {tags.map((tag) => (
                <div className="bg-gray-400 p-0.5">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReviewCard;
