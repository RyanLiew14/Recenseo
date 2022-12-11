import React, { useState } from "react";
import { getUser, logInUser } from "../backendhelpers/userHelpers"; // error
import Select from "react-select";
import { createReview, updateReview } from "../backendhelpers/reviewHelpers";
import { useEffect } from "react";
import { getUserCookie } from "../backendhelpers/cookieHelpers";

const EditReview = (props) => {
  const tagOptions = [
    { value: "Lecture Heavy", label: "Lecture Heavy" },
    { value: "Textbook Required", label: "Textbook Required" },
    { value: "Professor Dependent", label: "Professor Dependent" },
    { value: "Assignment Heavy", label: "Assignment Heavy" },
    { value: "Text Heavy", label: "Text Heavy" },
  ];

  const [comment, setComment] = useState(props.comment);
  const [rating, setRating] = useState(props.rating);
  const [difficulty, setDifficulty] = useState(props.difficulty);
  const [selectedTags, setSelectedTags] = useState(
    props.tags.map((tag) => {
      return { value: tag, label: tag };
    })
  );
  const [authToken, setAuthToken] = useState(props.authToken);
  const [userName, setUserName] = useState(props.userName);
  const [professor, setProfessor] = useState(props.professor);
  const [reviewId, setReviewId] = useState(props.reviewId);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setEditReview(false);
    const infoTags = [];
    selectedTags.map((tags) => infoTags.push(tags.value));

    const data = {
      reviewCreatedFor: props.courseName,
      reviewCreatedBy: userName,
      reviewDifficulty: difficulty,
      reviewRating: rating,
      reviewInfoTags: infoTags,
      reviewComment: comment,
      reviewProfessor: professor,
      reviewIsReported: false,
      reviewIsDeleted: false,
    };

    console.log(reviewId);

    updateReview(reviewId, data, authToken);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <form className="login-form" onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    className="h-40 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="name"
                    placeholder="comment"
                    id="comment"
                    name="comment"
                  />
                </div>
                <div class="input-group mb-3">
                  <label for="rating">Choose rating:</label>
                  <select
                    id="rating"
                    name="rating"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>

                <div class="input-group mb-3">
                  <label for="difficulty">Choose difficulty:</label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>

                <div class="input-group mb-3">
                  <input
                    className="mt-4 h-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    type="name"
                    placeholder="professor"
                    id="comment"
                    name="comment"
                  />
                </div>

                <div class="input-group mb-3">
                  <Select
                    isMulti
                    name="tags"
                    options={tagOptions}
                    value={selectedTags}
                    onChange={(e) => {
                      setSelectedTags(e);
                    }}
                  />
                </div>
                <div className="px-4 py-3 align-self-center sm:px-6">
                  <div className="text-center flex flex-row">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Edit Review
                    </button>
                    <button
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setEditReview(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
