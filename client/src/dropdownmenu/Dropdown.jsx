import React from "react";
import { useState } from "react";
import LogoutPopup from "../modals/LogoutPopup";
import { Link } from "react-router-dom";
import { setLoggedOut, setUserLoggedIn } from "../AuthenticationComponents";

const Dropdown = (props) => {
  const [logout, setLogOut] = useState(false);
  return (
    <div>
      {logout && (
        <LogoutPopup
          onClick={() => {
            setUserLoggedIn(false);
            props.setLogOut(!props.logout);
            setLogOut(false);
          }}
        />
      )}
      <div
        id="options"
        className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul className=" py-1 text-sm text-gray-700 dark:text-gray-200">
          <Link
            className="w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            to="/profile"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setLogOut(true);
            }}
            className="w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Dropdown;
