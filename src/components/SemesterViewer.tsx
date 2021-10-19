import React from "react";
import { Table } from "react-bootstrap";
// import { CourseViewer } from "./CourseViewer";

export function SemesterViewer(/*{semester}: {semester: Semester}*/): JSX.Element {
    return (
        <Table striped={true} bordered hover>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Number</td>
                    <td>Credits</td>
                </tr>
            </thead>
        </Table>
    );
}