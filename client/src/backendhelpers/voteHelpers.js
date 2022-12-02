import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;
const endpointBase = "http://localhost:" + port + "/api/votes/";

/* reqBody is the request body required to create a vote

reqBody is a JSON of the following format: 

{ 
      voteCreatedFor: String,                                     - The reviewId that this vote is being made for
      voteCreatedBy: String,                                      - The userID of the person creating the vote
      voteType: String,                                           - upvote or downvote
      voteIsDeleted: Boolean,                                      - Soft delete for the votes
}

 next is a function that gets called after the vote is created and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function in userHelper

 This API call will create a vote and return a json of the newly created vote on success.
 */

export const createVote = async (reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios.post(endpointBase, reqBody, { headers: headers }).then(next);
};

/* reviewId is the ID of the review required to get a review's votes
  
   next is a function that gets called after the votes are retrieved and the response is received from the backend.

   userToken is the user authentication token returned from the logIn function in userHelper
  
   This API call will get the votes of a signed in user for a given review and return a JSON of all the votes from the query
   */
export const getVoteByCourse = async (reviewId, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios.get(endpointBase + reviewId, { headers: headers }).then(next);
};

/* voteId is the id of the vote to delete

reqBody is the request body required to verify the creator and delete the vote

reqBody is a JSON of the following format: 

{ 
    voteCreatedBy: String
}

 next is a function that gets called after the vote is deleted and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will delete a vote using the username and authentication token.
 */
export const deleteVote = async (voteId, reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .delete(endpointBase + voteId, reqBody, { headers: headers })
    .then(next);
};

/* voteId is the id of the vote to update

reqBody is a JSON of the following format: 

{ 
      voteCreatedFor: String,                                     - The reviewId that this vote is being made for
      voteCreatedBy: String,                                      - The userID of the person creating the vote
      voteType: String,                                           - upvote or downvote
      voteIsDeleted: Boolean,                                      - Soft delete for the votes
}

 next is a function that gets called after the vote is updated and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will update a vote using the username and authentication token.
 */
export const updateVote = async (reviewId, reqBody, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .put(endpointBase + reviewId, reqBody, { headers: headers })
    .then(next);
};
