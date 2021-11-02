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
        console.log("CHECK");
        const temp_missing: Course[] = [];
        for(let i = 0; i<reqCourses.length; i++){

            for(let j = 0; j<allCourses.length; j++){
                if(allCourses[j].number === reqCourses[i].number 
                    && allCourses[j].name === reqCourses[i].name 
                    && allCourses[j].credits === reqCourses[i].credits){
                    break;
                }
                if(j === allCourses.length-1){
                    temp_missing.push(reqCourses[i]);
                }
            }            
        }
        setMissingCore(temp_missing);
    }

    //Only do the checks once to avoid inf loop
    const [checkRules, setCheckRules] = useState<boolean>(true);
    if (!visible && !checkRules){
        setCheckRules(true);
    }else if(visible && checkRules){
        checkCore();
        setCheckRules(false);
    }

    return(
        <Modal size="lg" show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Audit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong className="AuditLabel">Core Courses Missing:</strong>
                {missingCore.length?
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
                            {missingCore.map((c:Course, index:number) => { 
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
                    </Table>: <div>None</div>
                }
            </Modal.Body>
        </Modal>
    );
}