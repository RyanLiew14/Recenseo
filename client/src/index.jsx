import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./landingPage/LandingPage";
import ProfilePage from "./profilePage/profilePage";
import CourseRatePage from "./courseRatePage/courseRatePage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//   },
//   {
//     path: "/profile",
//     element: <ProfilePage/>,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingPage/>}/>
        <Route path = "/profile" element = {<ProfilePage/>}/>
        <Route path = "/courses/:id" element = {<CourseRatePage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
