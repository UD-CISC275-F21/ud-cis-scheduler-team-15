import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function SemesterViewer({semester}: {semester: Semester}): JSX.Element {
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    return (
        <Table striped={true} bordered hover>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Number</td>
                    <td>Credits</td>
                </tr>
                <tr>
                    <CourseViewer course={semester.courses[0]} dotsStyle={dotsStyle} setDotsStyle={setDotsStyle} setChangePromptVis={setChangePromptVis}></CourseViewer>
                </tr>
            </thead>
        </Table>
    );
}