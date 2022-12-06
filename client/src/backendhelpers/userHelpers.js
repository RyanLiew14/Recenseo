import axios from "axios";

const endpointBase = "http://localhost:5001/api/users/";

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

const customConfig = {
  headers: {
  'Content-Type': 'application/json'
  }
}

export const signUpUser = async (reqBody) => {
  await axios.post(endpointBase + "signup", reqBody, customConfig)
  .then(function(response) {
    if (response.status == 200) {
      // TO-DO: update field for userLoggedIn: true (?)
      alert("Signed up successfully!");
    }
  })
  .catch(function (error) {
    if (error.response){
      alert(error.response.data.error);
    }else if(error.request){
      alert(error.request.data);
    }else if(error.message){
      alert(error.message.data);
    }
  });
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
var userLoggedIn = false;

export const logInUser = async (reqBody) => {
  await axios.post(endpointBase + "login", reqBody, customConfig, {
      withCredentials: true,
      credentials: "include",
    })
  .then(function(response) {
    if (response.status == 200) {
      // TO-DO: update bool in App to indicate user logged in 
      alert("Logged in successfully!");
    }
  }).catch(function (error) {
    if (error.response){
        alert(error.response.data.error);
      }else if(error.request){
        alert(error.request.data);
      }else if(error.message){
        alert(error.message.data);
      }
  });
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
