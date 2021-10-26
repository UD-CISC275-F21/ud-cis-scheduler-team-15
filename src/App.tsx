import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { CourseViewer } from "./components/CourseViewer";
import { SemesterViewer } from "./components/SemesterViewer";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import {Welcome} from "./components/Welcome";
import { ChangeData } from "./components/ChangeData";

function App(): JSX.Element {
    const [semester0] = useState<Semester>(COURSES[0] as Semester);
    const [course, setCourse] = useState<Course>(COURSES[0].courses[0]);
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);
    console.log(changePromptVis);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <ChangeData course={course} setCourse={setCourse} visible={changePromptVis} setVisible={setChangePromptVis}></ChangeData>
            <SemesterViewer semester={semester0}></SemesterViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;