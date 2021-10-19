import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { CourseViewer } from "./components/CourseViewer";
import { TableViewer } from "./components/TableViewer";
import { Course } from "./interfaces/course";

function App(): JSX.Element {
    const [course] = useState<Course>(COURSES[0]);

    return (
        <div className="App">
            <CourseViewer course={course}></CourseViewer>
            <TableViewer></TableViewer>
        </div>
    );
}

export default App;
