import axios from "axios";

const endpointBase = "http://localhost:5001/api/";

// A cookie is automatically set when a user signs in (The authentication token or userToken is stored as a cookie which expires in a week, this will be used for persistence in the frontend)

// Call upon start of the application to retrieve any existing userAuth/userToken cookie

export const getUserCookie = async (next) => {
  await axios
    .get(endpointBase + "getUserCookie", {
      withCredentials: true,
      credentials: "include",
    })
    .then(next);
};

// Call upon log out of a user to delete any persistent cookie
export const deleteUserCookie = async (next) => {
  await axios
    .get(endpointBase + "deleteUserCookie", {
      withCredentials: true,
      credentials: "include",
    })
    .then(next);
};
