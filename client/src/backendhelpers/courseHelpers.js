import axios from "axios";

const endpointBase = "http://localhost:5001/api/courses/";

/* 
   next is a function that gets called after the votes are retrieved and the response is received from the backend.
  
   This API call will get all of the courses in the backend and return a JSON
   */
export const getCourse = async (next) => {
  return await axios.get(endpointBase + "getcourse").then(next);

};

const customConfig = {
  headers: {
  'Content-Type': 'application/json'
  }
}

export const getSpecificCourse = async(courseId, next)=> {
  return await axios.get(endpointBase + "getspecificcourse" + `/${courseId}`).then(next)
}
