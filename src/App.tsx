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
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    setChangePromptVis(false);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <CourseViewer course={course} dotsStyle={dotsStyle} setDotsStyle={setDotsStyle} setChangePromptVis={setChangePromptVis}></CourseViewer>
        </div>
    );
}

export default App;