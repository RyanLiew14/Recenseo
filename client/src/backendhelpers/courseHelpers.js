import axios from "axios";

const endpointBase = "http://localhost:5001/api/courses/";

/* 
   next is a function that gets called after the votes are retrieved and the response is received from the backend.
  
   This API call will get all of the courses in the backend and return a JSON
   */
export const getCourse = async (next) => {
  await axios.get(endpointBase + "getcourse").then(next);
};
