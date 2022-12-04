import axios from "axios";

const enpointBase = "http://localhost:5001/api/reviews/";

/* reqBody is the request body required to sign a user up

reqBody is a JSON of the following format: 

{ 
      reviewCreatedFor: String,                                     - The courseID that this review is being made for
      reviewCreatedBy: String,                                      - The userID of the person creating the review
      reviewDifficulty: Number,                                     - The difficulty of the course from 1-5
      reviewRating: Number,                                         - The course rating from 1-5
      reviewInfoTags: [String],                                     - Relevant info tags ["Group Work", "Textbook Required"]
      reviewComment: String,                                        - Free text for review
      reviewProfessor: String,                                      - The professor's name
      reviewIsReported: Boolean,                                    - Whether the review is reported or not
      reviewIsDeleted: Boolean,                                     - Soft delete for the review
}

 next is a function that gets called after the review is created and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function in userHelper

 This API call will create a review and return a json of the newly created review on success.
 */

export const createReview = async (reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .post(endpointBase + "createreview", reqBody, { headers: headers })
    .then(next);
};

/* userName is the userName of the user required to get a user's reviews
  
   next is a function that gets called after the user is created and the response is received from the backend.

   userToken is the user authentication token returned from the logIn function in userHelper
  
   This API call will get the reviews of a signed in user and return a JSON of all the reviews from the query
   */
export const getReviewByUser = async (userName, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .get(endpointBase + "getuserreview/" + userName, { headers: headers })
    .then(next);
};

/* courseName is the courseName of the course required to get a course's reviews
  
   next is a function that gets called after the user is created and the response is received from the backend.

   userToken is the user authentication token returned from the logIn function in userHelper
  
   This API call will get the reviews of a signed in user and return a JSON of all the reviews from the query
   */
export const getReviewByCourse = async (courseName, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .get(endpointBase + "getcoursereview/" + courseName, { headers: headers })
    .then(next);
};

/* reviewId is the id of the review to delete

reqBody is the request body required to verify the creator and delete the review

reqBody is a JSON of the following format: 

{ 
    reviewCreatedBy: String
}

 next is a function that gets called after the review is created and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will delete a review using the username and authentication token.
 */
export const deleteReview = async (reviewId, reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .delete(endpointBase + reviewId, reqBody, { headers: headers })
    .then(next);
};

/* reviewId is the id of the review to update

reqBody is a JSON of the following format: 

{ 
      reviewCreatedFor: String,                                     - The courseID that this review is being made for
      reviewCreatedBy: String,                                      - The userID of the person creating the review (MUST BE THE SAME AS THE REVIEW IN THE BACKEND)
      reviewDifficulty: Number,                                     - The difficulty of the course from 1-5
      reviewRating: Number,                                         - The course rating from 1-5
      reviewInfoTags: [String],                                     - Relevant info tags ["Group Work", "Textbook Required"]
      reviewComment: String,                                        - Free text for review
      reviewProfessor: String,                                      - The professor's name
      reviewIsReported: Boolean,                                    - Whether the review is reported or not
      reviewIsDeleted: Boolean,                                     - Soft delete for the review
}

 next is a function that gets called after the review is updated and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will update a review using the username and authentication token.
 */
export const updateReview = async (reviewId, reqBody, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .put(endpointBase + reviewId, reqBody, { headers: headers })
    .then(next);
};
