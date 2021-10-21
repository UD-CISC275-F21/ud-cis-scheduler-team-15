import React from "react";
import { Course } from "../interfaces/course";

export function CourseViewer({course}: {course: Course}): JSX.Element {
    return (
        <tr>
            <td>{course.name}</td>
            <td>{course.number}</td>
            <td>{course.credits}</td>
        </tr>
    );
}