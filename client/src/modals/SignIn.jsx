import React, { useState } from "react";
import { logInUser } from "../backendhelpers/userHelpers"; // error

const SignInPopup = (props) => {
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      userName: username,
      userPassword: pass.toString(),
    });
    const res = logInUser(data);
  };

  // TO-DO: close form with successful log in
  // props.onFormSwitch("");

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row-reverse">
                <button
                  type="button"
                  onClick={() => props.onFormSwitch("")}
                  className=" mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  x
                </button>
              </div>
              <h2 className="text-lg font-medium leading-6 text-red-900 text-center font-italic ">
                <strong>Login</strong>
              </h2>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    type="name"
                    placeholder="Username"
                    id="username"
                    name="username"
                  />
                </div>
                <div>
                  <div className="input-group mb-3">
                    <input
                      className="block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                    />
                  </div>
                </div>
                {/* <p className="text-center text-red-800">
                            Forgot Password?
                        </p> */}
                <div className="px-4 py-3 align-self-center sm:px-6">
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center ">
                <button
                  onClick={() => props.onFormSwitch("register")}
                  className="sm:text-sm text-blue-500 "
                >
                  Don't have an account? Create one instead.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
