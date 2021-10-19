import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseViewer({course}: {course: Course}): JSX.Element {
    return <Table striped={true} bordered hover>
        <tbody>
            <tr>
                <td>{course.name}</td>
                <td>{course.number}</td>
                <td>{course.credits}</td>
            </tr>
        </tbody>
    </Table>;
}