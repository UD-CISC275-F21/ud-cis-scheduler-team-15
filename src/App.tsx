import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { SemesterViewer } from "./components/SemesterViewer";
import { Semester } from "./interfaces/semester";

function App(): JSX.Element {
    const [semester] = useState<Semester>(COURSES[0] as Semester);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <SemesterViewer semester={semester}></SemesterViewer>
        </div>
    );
}

export default App;
