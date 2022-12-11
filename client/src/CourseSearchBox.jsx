import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { getCourse } from "./backendhelpers/courseHelpers";

const CourseSearchBox = (props) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [query, setQuery] = useState("");
  const [allCourses, setAllCourses] = useState();

  useEffect(() => {
    getCourse().then((course) =>
      setAllCourses(
        course.data.existingCourses.map(
          (course) =>
            course.courseDepartmentAcronym +
            " " +
            course.courseName.match(/\d+/g)
        )
      )
    );
  });
  const filteredCourses =
    query === ""
      ? [""]
      : allCourses.filter((course) => {
          return course.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-row">
      <Combobox
        className="border-black border-2 flex items-center"
        as="div"
        value={selectedCourse}
        onChange={setSelectedCourse}
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />

        <Combobox.Options className="bg-white hover:bg-red-500">
          {filteredCourses?.map((course) => (
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
