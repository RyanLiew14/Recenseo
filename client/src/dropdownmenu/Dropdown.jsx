import React from 'react';
import { useState } from "react";
import LogoutPopup from "../modals/LogoutPopup";

const Dropdown = (props) => {
  const [logout, setLogOut] = useState(false);
  return(
  <div>
  { logout && ( <LogoutPopup onClick={()=>{setLogOut(!logout)}}/> )}
  <div id="options" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
      <ul className=" py-1 text-sm text-gray-700 dark:text-gray-200">
        <button onClick={()=>{}} className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          Profile
        </button>
        <button onClick={()=>{setLogOut(logout=> !logout)}} className="w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          Logout
        </button>
      </ul>
  </div>
  </div>
  )
}
export default Dropdown;