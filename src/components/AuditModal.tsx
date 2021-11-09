import React, { useState } from "react";
import {Modal, Table} from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import RequiredCourses from "../assets/RequiredCoreCourses.json";
import { Course } from "../interfaces/course";
import ArtsHumanities from "../assets/ArtsHumanities.json";
import { CourseViewer } from "./CourseViewer";

export function AuditModal({plan, visible, setVisible}:
    {plan: Semester[];
    visible: boolean;
    setVisible: (visible: boolean)=>void
    }): JSX.Element{
    const hide = () => setVisible(false);

    //Missing Core Courses
    const [missingCore, setMissingCore] = useState<Course[]>([]);

    //CISC electives
    const [CISCelectives, setCISCelectives] = useState<Course[]>([]);

    //Breadth electives
    const [breadth, setBreadth] = useState<Course[]>([]);

    //Get require courses for checking
    const reqCourses: Course[] = RequiredCourses as Course[];
    const artsHumanities: string[] = ArtsHumanities as string[];
    
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

    //Check for CISC electives
    // 6 required that are not core course
    function checkCISCElec():void{
        const temp_CISCelectives: Course[] = [];
        for (let i = 0; i<allCourses.length; i++){
            if(allCourses[i].number.startsWith("CISC")){
                for (let j = 0; j<reqCourses.length; j++){
                    if(allCourses[i].name == reqCourses[j].name){
                        break;
                    }
                    if(j === reqCourses.length-1){
                        temp_CISCelectives.push(allCourses[i]);
                    }
                }
            }
        }
        setCISCelectives(temp_CISCelectives);
    }

    //Check for breadths
    function checkBreadths():void{
        const empty_course: Course = {number:"", name:"", credits:0};
        const temp_breadth: Course[] = [];

        //Arts and Humanities
        for (let i = 0; i<allCourses.length; i++){
            for (let j = 0; j<artsHumanities.length; j++){
                //Find first one that satisfies arts and humanities
                if (allCourses[i].number === (artsHumanities[j])){
                    temp_breadth.push(allCourses[i]);
                    break;
                }
            }
            if (temp_breadth.length == 1){
                break;
            }
        }
        if (temp_breadth.length == 0){
            //add empty course if nothing satisfies
            temp_breadth.push(empty_course);
        }

        setBreadth(temp_breadth);
    }

    //Only do the checks once to avoid inf loop
    const [checkRules, setCheckRules] = useState<boolean>(true);
    if (!visible && !checkRules){
        setCheckRules(true);
    }else if(visible && checkRules){
        checkCore();
        checkCISCElec();
        checkBreadths();
        setCheckRules(false);
    }

    return(
        <Modal size="lg" show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Audit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong className="AuditLabel">Core Courses Missing</strong>
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
                <strong className="AuditLabel">CISC Electives (18 credits required)</strong>
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
                        {CISCelectives.map((c:Course, index:number) => { 
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
                <strong className="AuditLabel">Breadth Electives</strong>
                <strong className="AuditLabel">Arts and Humanities (3 credits required)</strong>
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
                        {breadth.map((c:Course, index:number) => { 
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
            </Modal.Body>
        </Modal>
    );
}