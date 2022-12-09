import React, { useState } from "react";
import { signUpUser } from "../backendhelpers/userHelpers";

const SignUpPopup = (props) => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [signUp, setSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPass !== pass) {
      console.log("The passwords don't match, please double check.");
      return;
    } else {
      const data = JSON.stringify({
        userName: username,
        userEmail: email,
        userPassword: pass,
        userFirstName: firstName,
        userLastName: lastName,
        userType: "Basic",
        userIsReported: false,
        userLoggedIn: false,
      });
      signUpUser(data, props);
    }
  };

  // TO-DO: close form with successful sign up and change page to have name show up in corner
  // props.onFormSwitch("");

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="flex relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center w-1/2">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h1 className="text-lg font-medium leading-6 text-red-900 text-center py-20">
                <strong>Sign up</strong>
              </h1>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group mb-3 flex-column">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    type="name"
                    placeholder="Username"
                    id="user-name"
                    name="user-name"
                  />
                </div>
                <div className="input-group mb-3 flex-column">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="name"
                    placeholder="First Name"
                    id="first-name"
                    name="first-name"
                  />
                </div>
                <div className="input-group mb-3 flex-column">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="name"
                    placeholder="Last Name"
                    id="last-name"
                    name="last-name"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    className="width-10 block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                  />
                </div>
                <div>
                  <div className="input-group mb-3">
                    <input
                      className="block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 sm:text-sm"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      type="password"
                      placeholder="Confirm password"
                      id="confirm-password"
                      name="confirm-password"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 align-self-center sm:px-6">
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center">
                <button
                  onClick={() => {
                    props.onFormSwitch("login");
                  }}
                  className="sm:text-sm text-blue-500"
                >
                  Already have an account? Log in here.
                </button>
              </div>
            </div>
          </div>
          <div className="border border-left-gray-600 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center w-1/2">
            <div className="flex flex-row-reverse">
              <button
                type="button"
                onClick={() => props.onFormSwitch("")}
                className=" mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                x
              </button>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div>
                <h1 className="text-lg font-large leading-6 text-red-900 text-center font-italic py-10">
                  <strong>Members enjoy more perks </strong>
                </h1>
              </div>
              <div className="flex px-3 py-5 ">
                <h3 className="text-gray-500">Upvote and downvote reviews</h3>
              </div>
              <div className="flex px-3 py-5">
                <h3 className="text-gray-500">
                  Keep track and modify your reviews
                </h3>
              </div>
              <div className="flex px-3">
                <p className="text-red-800">And more...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;

// was this put here by mistake? - popup for deactivating an account
// const SignUpPopup = ({onClick}) => {
//     return(
//     <div className="fixed inset-0 z-10 overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//         <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">Deactivate account</h3>
//                 <div className="mt-2">
//                     <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
//                 </div>
//                 </div>
//             </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//             <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
//             <button type="button" onClick={onClick} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
//             </div>
//         </div>
//         </div>
//     </div>
//     )
// }
