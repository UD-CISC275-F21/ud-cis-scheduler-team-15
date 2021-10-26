import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import {Welcome} from "./components/Welcome";
import { SemesterTable } from "./components/SemesterTable";

function App(): JSX.Element {
    const [semester0, setSemester0] = useState<Semester>(COURSES[0] as Semester);
    const [course, setCourse] = useState<Course>(COURSES[0].courses[0]);
    const [visible, setVisible] = useState<boolean>(true);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <SemesterTable semester={semester0} setSemester={setSemester0}></SemesterTable>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;