import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { CourseViewer } from "./components/CourseViewer";
// import { SemesterViewer } from "./components/SemesterViewer";
import { Course } from "./interfaces/course";
// import { Semester } from "./interfaces/semester";
import {Welcome} from "./components/Welcome";

function App(): JSX.Element {
    // const [semester] = useState<Semester>(COURSES[0] as Semester);
    const [course] = useState<Course>(COURSES[0].courses[0]);
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    if (changePromptVis){
        setChangePromptVis(false);
    }       

    const [visible, setVisible] = useState<boolean>(true);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <CourseViewer course={course} dotsStyle={dotsStyle} setDotsStyle={setDotsStyle} setChangePromptVis={setChangePromptVis}></CourseViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;