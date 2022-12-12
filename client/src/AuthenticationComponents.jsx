import { useState, useEffect } from "react";
import SignUpPopup from "./modals/SignUpPopup";

import SignInPopup from "./modals/SignIn";
import Dropdown from "./dropdownmenu/Dropdown";
import profileFill from "./svg/person-fill.svg";

import { deleteUserCookie } from "./backendhelpers/cookieHelpers";

let userLoggedIn = false;

export const setUserLoggedIn = function (loggedIn) {
  userLoggedIn = loggedIn;
};

let username = "";
export const setName = function (name) {
  username = name;
};

function AuthenticationComponents() {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [logout, setLogOut] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [createReview, setCreateReview] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      deleteUserCookie();
    }
  }, [logout]);

  const toggleForm = (formName) => {
    if (formName === "login") {
      setSignIn(true);
      setSignUp(false);
    } else if (formName === "register") {
      setSignIn(false);
      setSignUp(true);
    } else {
      setSignIn(false);
      setSignUp(false);
    }
  };

  return (
    <div className="flex justify-center text-center flex-col font-mono">
      {(signUp || signIn || createReview) && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          {signIn && (
            <SignInPopup
              onClick={() => {
                setSignIn(!signIn);
              }}
              onFormSwitch={toggleForm}
            />
          )}
          {signUp && (
            <SignUpPopup
              onClick={() => {
                setSignUp(!signUp);
              }}
              onFormSwitch={toggleForm}
            />
          )}
        </div>
      )}

      <div className="flex flex-row font-mono">
        {userLoggedIn ? (
          <div className="mt-1 flex w-full items-end justify-center flex-col mr-4">
            <div>
              <button
                onClick={() => {
                  setDropDown((dropdown) => !dropdown);
                }}
                id="Profile"
                data-dropdown-toggle="options"
                className="text-red-700 bg-white hover:bg-white-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center hover:bg-gray-100 "
                type="button"
              >
                <img className="px-4" src={profileFill}></img>
                {username}

                <svg
                  class="ml-2 w-4 h-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="w-full">
                <div className="flex justify-end items-center flex-col">
                  {dropdown && (
                    <Dropdown
                      onClick={() => {
                        setDropDown(!dropdown);
                      }}
                      setLogOut={setLogOut}
                      logout={logout}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-end items-center">
            <div className="flex flex-row gap-3 mr-4">
              <button
                onClick={() => {
                  setSignIn(!signIn);
                }}
              >
                Login
              </button>
              <button
                className={"bg-red-800 rounded-lg p-1 text-yellow-300"}
                onClick={() => {
                  setSignUp(!signUp);
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AuthenticationComponents;
