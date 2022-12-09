import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const CourseSearchBox = (props) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [query, setQuery] = useState("");

  const filteredCourses =
    query === ""
      ? [""]
      : props.courses.filter((course) => {
          return course.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-row">
      <MagnifyingGlassIcon className="h-6 w-6 mr-2"></MagnifyingGlassIcon>
      <Combobox
        className="border-black border-2"
        as="div"
        value={selectedCourse}
        onChange={setSelectedCourse}
      >
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />

        <Combobox.Options className="bg-white hover:bg-red-500">
          {filteredCourses.map((course) => (
            <Combobox.Option key={course} value={course}>
              <Link to={`/courses/${course}`}>{course}</Link>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default CourseSearchBox;
