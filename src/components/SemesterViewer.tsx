import React from "react";
import { Table, Card } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function SemesterViewer({semester}: {semester: Semester}): JSX.Element {
    return (
        <div>
            <Card>
                <Card.Body>{semester.term} of {semester.year}</Card.Body>
            </Card>
            <Table striped={true} bordered={true} hover={true}>
                <tr>
                    <thead>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Credits</th>    
                    </thead>
                </tr>
                <tbody>
                    { semester.courses.map((course: Course) => {
                        return <CourseViewer key={course.number} course={course}></CourseViewer>;
                    })}
                </tbody>
            </Table>
        </div>
    );
}