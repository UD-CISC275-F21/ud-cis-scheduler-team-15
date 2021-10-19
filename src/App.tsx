import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { CourseViewer } from "./components/CourseViewer";
// import { SemesterViewer } from "./components/SemesterViewer";
import { Course } from "./interfaces/course";
// import { Semester } from "./interfaces/semester";

function App(): JSX.Element {
    // const [semester] = useState<Semester>(COURSES[0] as Semester);
    const [course] = useState<Course>(COURSES[0].courses[0]);

    return (
        <div className="App">
            <CourseViewer course={course}></CourseViewer>
        </div>
    );
}

export default App;
