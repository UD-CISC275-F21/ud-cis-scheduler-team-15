import React, { useState } from "react";
import {Modal, Table} from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import RequiredCourses from "../assets/RequiredCoreCourses.json";
import { Course } from "../interfaces/course";
import ArtsHumanities from "../assets/ArtsHumanities.json";
import HistoryCultural from "../assets/HistoryCultural.json";
import SocialBehavioral from "../assets/SocialBehavioral.json";
import Tech from "../assets/Tech.json";
import COEupper from "../assets/COEupper.json";
import CISCprereqs from "../assets/CISCprereqs.json";
import { Prereq } from "../interfaces/prereq";

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

    //Prerequisite rules
    const prereqs: Prereq[] = CISCprereqs as Prereq[];
    
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
        const temp_breadth: Course[] = [];

        //Check general breadth
        temp_breadth.push(isIn(allCourses,ArtsHumanities));
        temp_breadth.push(isIn(allCourses,HistoryCultural));
        temp_breadth.push(isIn(allCourses,SocialBehavioral));
        temp_breadth.push(isIn(allCourses,Tech));

        //COE additional breadths
        const temp_additional: Course[] = isInAll(allCourses,COEupper);
        //only one under 300 allowed
        let used_lower = false;
        for (let i = 0; i<temp_additional.length; i++){
            //Upper?
            const upper:boolean = temp_additional[i].number.slice(-3,-2) == "3" || temp_additional[i].number.slice(-3,-2) == "4";
            //Is it already being used?
            if(isIn(temp_breadth,[temp_additional[i].number]).number){
                continue;
            }else{
                //Is it a second lower?
                if (!upper && used_lower){
                    continue;
                }else{
                    //Add it to the list
                    temp_breadth.push(temp_additional[i]);
                    if (!upper){
                        used_lower = true;
                    }
                    //Is this our third? (only need 3)
                    if (temp_breadth.length == 7){
                        break;
                    }
                }
            }
        }
        //if no additional breadth
        console.log(temp_additional);
        if(!temp_additional[0].number){
            temp_breadth.push({number:"", name:"", credits:0});
        }

        setBreadth(temp_breadth);
    }

    function checkPrereqs():void{

    }

    //Does the list of courses contain any of the numbers in the list of course numbers?
    //If so, return the course of the first time it does
    //If not, returns a 0 credit, empty course
    function isIn(courses:Course[], nums:string[]):Course{
        for (let i = 0; i<courses.length; i++){
            for (let j = 0; j<nums.length; j++){
                //Find first one that satisfies
                if (courses[i].number === nums[j]){
                    return courses[i];
                }
            }
        }
        return {number:"", name:"", credits:0};
    }

    //Same as isIn, but returns all
    function isInAll(courses:Course[], nums:string[]):Course[]{
        const temp_courses:Course[] = [];
        for (let i = 0; i<courses.length; i++){
            for (let j = 0; j<nums.length; j++){
                //Does it satisfy?
                if (courses[i].number === nums[j]){
                    temp_courses.push(courses[i]);
                }
            }
        }
        //add the empty course if nothing matches
        if (temp_courses.length === 0){
            temp_courses.push({number:"", name:"", credits:0});
        }
        return temp_courses;
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
                <div>
                    <strong className="AuditLabel">Breadth Electives</strong>
                </div>
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
                        {breadth[0]?
                            <tr>
                                <td className="text-center">{breadth[0].number}</td>
                                <td className="text-center">{breadth[0].name}</td>
                                <td className="text-center">{breadth[0].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <strong className="AuditLabel">History and Cultural Change (3 credits required)</strong>
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
                        {breadth[1]?
                            <tr>
                                <td className="text-center">{breadth[1].number}</td>
                                <td className="text-center">{breadth[1].name}</td>
                                <td className="text-center">{breadth[1].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <strong className="AuditLabel">Social and Behavioral Science (3 credits required)</strong>
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
                        {breadth[2]?
                            <tr>
                                <td className="text-center">{breadth[2].number}</td>
                                <td className="text-center">{breadth[2].name}</td>
                                <td className="text-center">{breadth[2].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <strong className="AuditLabel">Mathematics, Natural Sciences, and Technology (3 credits required)</strong>
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
                        {breadth[3]?
                            <tr>
                                <td className="text-center">{breadth[3].number}</td>
                                <td className="text-center">{breadth[3].name}</td>
                                <td className="text-center">{breadth[3].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <strong className="AuditLabel">COE Additional Breadth (9 credits, 6 upper)</strong>
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
                        {breadth.slice(4).map((c:Course, index:number) => { 
                            return (
                                <tr key={index}>
                                    <td className="text-center">{c.number}</td>
                                    <td className="text-center">{c.name}</td>
                                    <td className="text-center">{c.credits}</td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}