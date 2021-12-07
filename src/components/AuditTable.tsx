import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function AuditTable({courses}:
    {courses: Course[]}): JSX.Element{
    return(
        <Table className="AuditTable" striped={true} bordered>
            <thead>
                <tr>
                    <th className="text-center">
                        Course Number
                    </th>
                    <th className="text-center">
                        Course Name
                    </th>
                    <th className="text-center">
                        Credits
                    </th>
                </tr>
            </thead>
            <tbody>
                {courses.map((c:Course, index:number) => { 
                    return (
                        <tr key={index}>
                            <td className="text-center">{c.number}</td>
                            <td className="text-center">{c.name}</td>
                            <td className="text-center">{c.credits}</td>
                        </tr>
                    );
                }
                )}
            </tbody>
        </Table>
    );
}