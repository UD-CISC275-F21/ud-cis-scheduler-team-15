import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function SemesterTable({sem_index, plan, setPlan}:
    {sem_index: number;
    plan: Semester[];
    setPlan: (plan: Semester[])=>void}):
    JSX.Element{
    return (
        <div className = "SemesterTable">
            <table className="SemesterHeader">
                <td className="yearLabel">
                    <strong>{plan[sem_index].year}</strong>
                </td>
                <td className="semLabel">
                    <strong>{plan[sem_index].semester}</strong>
                </td>
            </table>
            <Table striped={true} bordered>
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
                    {plan[sem_index].courses.map((c:Course, index:number) => { 
                        return (
                            <CourseViewer key={index} index={index} sem_index={sem_index} plan={plan} setPlan={setPlan}></CourseViewer>
                        );
                    }
                    )}
                </tbody>
            </Table>
        </div>
    );
}