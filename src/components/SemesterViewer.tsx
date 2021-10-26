import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { ChangeData } from "./ChangeData";
import { CourseViewer } from "./CourseViewer";
import { SemesterHeader } from "./SemesterHeader";

export function SemesterViewer({semester, setSemester}: 
    {semester: Semester;
    setSemester: (semester: Semester)=>void}): 
    JSX.Element {

    function setCourse(i: number, course: Course):void{
        const temp_semester = semester;
        temp_semester.courses[i] = course;
        setSemester(temp_semester);
    }

    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    return (
        <div>
            <Table striped={true} bordered hover>
                <thead>
                    <tr>
                        <SemesterHeader></SemesterHeader>
                    </tr>
                    <tr>
                        <CourseViewer course={semester.courses[0]} dotsStyle={dotsStyle} setDotsStyle={setDotsStyle} setChangePromptVis={setChangePromptVis}></CourseViewer>
                    </tr>
                </thead>
            </Table>
            <ChangeData course={semester.courses[0]} setCourse={setCourse} visible={changePromptVis} setVisible={setChangePromptVis} i={0}></ChangeData>
        </div>
    );
}