import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function CoursesTable({semester, setSemester}:
    {    semester: Semester;
    setSemester: (semester: Semester)=>void}):
    JSX.Element{
    return (
        <Table className = "SemesterTable" striped={true} bordered>
            <thead>
                <tr>
                    <th>
                        Course Number
                    </th>
                    <th>
                        Course Name
                    </th>
                    <th>
                        Credits
                    </th>
                </tr>
            </thead>
            <tbody>
                {semester.courses.map((c:Course, index:number) => { 
                    return (
                        <CourseViewer key={index} index={index} semester={semester} setSemester={setSemester}></CourseViewer>
                    );
                }
                )}
            </tbody>
        </Table>
    );
}