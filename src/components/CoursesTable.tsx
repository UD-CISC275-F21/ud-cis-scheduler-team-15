import React, { useState } from "react";
import { TextDecoder } from "util";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function CoursesTable({semester, setSemester}:
    {    semester: Semester;
    setSemester: (semester: Semester)=>void}):
    JSX.Element{
    return (
        <div>
            {semester.courses.map((c:Course, index:number) => { 
                return (<div key={index}>
                    <CourseViewer index={index} semester={semester} setSemester={setSemester}></CourseViewer>
                </div>
                );
            }
            )}
        </div>
    );
}