import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseViewer({course}: {course: Course}): JSX.Element {
    return <Table striped={true} bordered hover>
        <thead>
            <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Credits</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{course.name}</td>
                <td>{course.number}</td>
                <td>{course.credits}</td>
            </tr>
        </tbody>
    </Table>;
}