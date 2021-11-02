import React, { useState } from "react";
import {Modal, Table} from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import RequiredCourses from "../assets/RequiredCoreCourses.json";
import { Course } from "../interfaces/course";

export function AuditModal({plan, visible, setVisible}:
    {plan: Semester[];
    visible: boolean;
    setVisible: (visible: boolean)=>void
    }): JSX.Element{
    const hide = () => setVisible(false);

    //Missing Core Courses
    const [missingCore, setMissingCore] = useState<Course[]>([]);
    //Only check rules once upon rendering
    const [checkRules, setCheckRules] = useState<boolean>(true);

    //Get require courses for checking
    const reqCourses: Course[] = RequiredCourses as Course[];
    
    //Raw list of all courses (will be helpful for some checks)
    const allCourses: Course[] = [];
    for (let i = 0; i<plan.length; i++){
        for (let j = 0; j<plan[i].courses.length; j++){
            allCourses.push(plan[i].courses[j]);
        }
    }
    
    //Checks for core courses
    function checkCore():void{
        const temp_missing: Course[] = [];
        for(let i = 0; i<reqCourses.length; i++){
            if(!allCourses.includes(reqCourses[i])){
                temp_missing.push(reqCourses[i]);
            }
            
        }
        setMissingCore(temp_missing);
    }

    //Only do the checks once to avoid inf loop
    if (checkRules){
        checkCore();
        setCheckRules(false);
    }

    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Audit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Core Courses Missing:</div>
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
                        {missingCore.map((c:Course, index:number) => { 
                            return (
                                <tr key={index}>
                                    <td className="courseNum">{c.number}</td>
                                    <td className="courseName">{c.name}</td>
                                    <td className="credits">{c.credits}</td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}