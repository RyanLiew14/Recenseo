import React, { useState, useEffect } from "react";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Select from "react-select";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FacultyBox() {

    const facultyOptions = [
        { value: "Arts", label: "Arts" },
        { value: "Science", label: "Science" },
        { value: "Business", label: "Business" },
        { value: "Architecture, Planning and Landscape", label: "Architecture" },
        { value: "Engineering", label: "Engineering" },
        { value: "Nursing", label: "Nursing" },
        { value: "Education", label: "Education" },
    ];

    const [selected, setSelected] = useState([]);


    return(
        <Select
            isMulti
            name="tags"
            options={facultyOptions}
            value={selected}
            onChange={(e) => {
                setSelected(e);
            }}
        />
        // <Menu as="div" className="relative inline-block text-left px-2">
        //     <div>
        //         <Menu.Button className="inline-flex w-full justify-center border border-neutral-600 bg-white px-14 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
        //         Faculty
        //         <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        //         </Menu.Button>
        //     </div>

        //     <Transition
        //         as={Fragment}
        //         enter="transition ease-out duration-100"
        //         enterFrom="transform opacity-0 scale-95"
        //         enterTo="transform opacity-100 scale-100"
        //         leave="transition ease-in duration-75"
        //         leaveFrom="transform opacity-100 scale-100"
        //         leaveTo="transform opacity-0 scale-95"
        //     >
        //         <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        //         <div className="py-1">
        //             <Menu.Item>
        //             {({ active }) => (
        //                 <a
        //                 className={classNames(
        //                     active ? 'bg-gray-100' : 'text-gray-700',
        //                     'block px-4 py-2 text-sm'
        //                 )}
        //                 >
        //                 placeholder
        //                 </a>
        //             )}
        //             </Menu.Item>
        //         </div>
        //         </Menu.Items>
        //     </Transition>
        // </Menu>
    );
}