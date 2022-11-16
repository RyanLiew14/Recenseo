import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

//replace this will database
const courses = ["SENG513", "GLIZZY303", "ALEJO123"];

const CourseSearchBox = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [query, setQuery] = useState("");

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((course) => {
          return course.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-row items-center">
      <MagnifyingGlassIcon className="h-6 w-6 mr-2"></MagnifyingGlassIcon>
      <Combobox
        className="border-black border-2"
        as="div"
        value={selectedCourse}
        onChange={setSelectedCourse}
      >
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />

        <Combobox.Options>
          {filteredCourses.map((course) => (
            <Combobox.Option key={course} value={course}>
              {course}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default CourseSearchBox;
