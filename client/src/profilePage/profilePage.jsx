import smallRecenseo from "./Small recenseo.svg";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import ReviewCard from "../cardComponent/reviewCard";
import { getUserCookie } from "../backendhelpers/cookieHelpers";
import { getUser, updateUser } from "../backendhelpers/userHelpers";
import { deleteReview, getReviewByUser } from "../backendhelpers/reviewHelpers";
import EditReview from "../modals/editReview";

function ProfilePage() {
  const [tabState, setTabState] = useState("baseInfo");
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [authToken, setAuthToken] = useState();
  const [reviews, setReviews] = useState();
  const [userType, setUserType] = useState();
  const [editReview, setEditReview] = useState(false);
  const [reviewId, setReviewId] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    getUserCookie().then((cookie) => {
      setAuthToken(cookie.data.userAuth);
      setUserName(cookie.data.userName);
    });

    if (authToken !== undefined && userName !== undefined) {
      getUser(userName, authToken).then((userInfo) => {
        setFirstName(userInfo.data.userFirstName);
        setLastName(userInfo.data.userLastName);
        setEmail(userInfo.data.userEmail);
        setUserType(userInfo.data.userType);
      });
    }

    if (authToken !== undefined && userName !== undefined) {
      getReviewByUser(userName, authToken).then((review) => {
        setReviews(review.data.existingReviews);
      });
    }
  }, [authToken, userName]);

  return (
    <div className="flex justify-center text-center flex-col font-mono">
      <div className="flex flex-row bg-red-900 h-12">
        <div className="w-full flex text-white items-center justify-start">
          <img className="h-12 w-12 mr-4" src={smallRecenseo}></img>
        </div>
        <div className="w-full flex text-white items-center justify-end mr-4">
          <UserCircleIcon className="h-12 w-12 mr-4"></UserCircleIcon>
          <p> {userName}</p>
        </div>
      </div>

      <div className="flex flex-row items-center ml-16 mt-24">
        <UserCircleIcon className="h-36 w-36"></UserCircleIcon>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{userName}</p>
        </div>
      </div>

      <hr className="my-4 mx-auto w-11/12 h-1 bg-gray-100 rounded md:my-10 dark:bg-gray-700"></hr>

      <div className="justify-center flex flex-row gap-12 ml-4 mr-4">
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
            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            {editMode && (
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  setEditMode(false);
                  updateUser(
                    {
                      userName: userName,
                      userEmail: email,
                      userFirstName: firstName,
                      userLastName: lastName,
                      userType: userType,
                      userIsReported: false,
                    },
                    authToken
                  );
                }}
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

            <button
              className="hover:underline hover:cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            {editMode && (
              <button
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  setEditMode(false);
                  updateUser(
                    {
                      userName: userName,
                      userEmail: email,
                      userFirstName: firstName,
                      userLastName: lastName,
                      userType: userType,
                      userIsReported: false,
                    },
                    authToken
                  );
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}

      {tabState === "ratings" && (
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-8/12 mt-4 space-y-4">
            {editReview && (
              <EditReview
                courseName={reviews[index].reviewCreatedFor}
                comment={reviews[index].reviewComment}
                rating={reviews[index].reviewRating}
                difficulty={reviews[index].reviewDifficulty}
                tags={reviews[index].reviewInfoTags}
                authToken={authToken}
                userName={userName}
                professor={reviews[index].reviewProfessor}
                reviewId={reviews[index]._id}
                setEditReview={setEditReview}
              />
            )}
            {reviews?.map((review, index) => (
              <div className="flex flex-row">
                <div className="w-full">
                  <ReviewCard
                    courseTags={review.reviewInfoTags}
                    courseRating={review.reviewRating}
                    courseDifficulty={review.reviewDifficulty}
                    courseProfessor={review.reviewProfessor}
                    courseComment={review.reviewComment}
                    courseName={review.reviewCreatedFor}
                  />
                </div>

                <div className="flex justify-end items-center">
                  <div className="flex flex-col space-y-4">
                    <button
                      className="hover:underline"
                      onClick={() => {
                        setEditReview(true);
                        setIndex(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:underline ml-5"
                      onClick={() => {
                        console.log(review._id, authToken);
                        deleteReview(
                          review._id,
                          {
                            reviewCreatedBy: review.reviewCreatedBy,
                          },
                          authToken
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="flex flex-row bg-red-900 h-12 mt-8 w-full fixed bottom-0">
        <div className="w-full flex text-white text-xs items-center justify-start">
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
