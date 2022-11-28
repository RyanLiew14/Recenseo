import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;
const endpointBase = "http://localhost:" + port + "/api/users/";

/* reqBody is the request body required to sign a user up

reqBody is a JSON of the following format: 

{ 
    userName: String,
    userEmail: String,
    userPassword: String,
    userFirstName: String,
    userLastName: String,
    userType:String ("Basic" or "Moderator"),
    userIsReported: Boolean,
}

 next is a function that gets called after the user is created and the response is received from the backend.

 This API call will create a user and return a json of the newly created user on success.
 */

export const signUpUser = async (reqBody, next) => {
  await axios.post(endpointBase + "signup", reqBody).then(next);
};

/* reqBody is the request body required to log in a user

reqBody is a JSON of the following format: 

{ 
    userName: String,
    userPassword: String,
}

 next is a function that gets called after the user is created and the response is received from the backend.

 This API call will sign a user in and return a token which is used to authenticate the user for any future requests
 such as creating reviews.
 */
export const logInUser = async (reqBody, next) => {
  await axios
    .post(endpointBase + "login", reqBody, {
      withCredentials: true,
      credentials: "include",
    })
    .then(next);
};

/* reqBody is the request body with the username of the account to delete

reqBody is a JSON of the following format: 

{ 
    userName: String,
}

 next is a function that gets called after the user is created and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will delete a user account using the username and authentication token.
 */
export const deleteUser = async (reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .delete(endpointBase + "deleteaccount", reqBody, { headers: headers })
    .then(next);
};

/* reqBody is the request body required to update a user

reqBody is a JSON of the following format: 

{ 
    userName: String,
    userEmail: String,
    userPassword: String,
    userFirstName: String,
    userLastName: String,
    userType:String ("Basic" or "Moderator"),
    userIsReported: Boolean,
}

 next is a function that gets called after the user is created and the response is received from the backend.

 userToken is the user authentication token returned from the logIn function above

 This API call will update a user account using the username and authentication token.
 */
export const updateUser = async (reqBody, next, userToken) => {
  const headers = {
    Authorization: "bearer " + userToken,
  };
  await axios
    .put(endpointBase + "updateaccount", reqBody, { headers: headers })
    .then(next);
};
