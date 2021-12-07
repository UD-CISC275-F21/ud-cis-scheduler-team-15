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
import {AuditTable} from "./AuditTable";

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
    const [rules_violated, set_rules_violated] = useState<boolean[][]>([]);
    const [missing_prereqs, set_missing_prereqs] = useState<boolean>(false);
    
    //Raw list of all courses (will be helpful for some checks)
    const allCourses: Course[] = [];
    for (let i = 0; i<plan.length; i++){
        for (let j = 0; j<plan[i].courses.length; j++){
            allCourses.push(plan[i].courses[j]);
        }
    }

    //Matrix of the plan, only need the numbers (for prereq checks)
    const plan_nums: string[][] = [[]];
    for (let i = 0; i<plan.length; i++){
        const sem_nums: string[] = [];
        for (let j = 0; j<plan[i].courses.length; j++){
            sem_nums.push(plan[i].courses[j].number);
        }
        plan_nums.push(sem_nums);
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
        if(!temp_additional[0].number){
            temp_breadth.push({number:"", name:"", credits:0});
        }

        setBreadth(temp_breadth);
    }

    function checkPrereqs():void{
        //check each rule from the json file
        const rules_violated_temp: boolean[][] = [];
        for (let i = 0; i<prereqs.length; i++){
            const each_prereq: boolean[] = [];
            let semester_course_occurs = -1;
            //Find the course
            for (let j = 0; j<plan.length; j++){
                if (isIn(plan[j].courses, [prereqs[i].course]).number){
                    //Found it!
                    semester_course_occurs = j;
                    break;
                }
                //If it's not here, the rule can't be violated, so it's false for each course
                if (j === plan.length-1){
                    for (let k = 0; k<prereqs[i].prereqs.length; k++){
                        each_prereq.push(false);
                    }
                    break;
                }
            }
            //We found it, gotta see if the rules are followed
            for (let j = 0; j<prereqs[i].prereqs.length; j++){
                for (let k = 0; k<semester_course_occurs; k++){
                    if(isIn(plan[k].courses, [prereqs[i].prereqs[j]]).number){
                        //Prerequisite rule is satisfied
                        each_prereq.push(false);
                        break;
                    }
                    //Prereq not satisfied
                    if (k === semester_course_occurs-1){
                        each_prereq.push(true);
                    }
                }
            }
            //Add the results for this course
            rules_violated_temp.push(each_prereq);
        }
        //Are any prereqs missing? (For rendering "none missing" message)
        let missing_prereqs_temp = false;
        for (let i = 0; i<rules_violated_temp.length; i++){
            for (let j = 0; j<rules_violated_temp[i].length; j++){
                if (rules_violated_temp[i][j]){
                    missing_prereqs_temp = true;
                    break;
                }
            }
            if (missing_prereqs_temp){
                break;
            }
        }
        //Update usestate
        set_missing_prereqs(missing_prereqs_temp);
        set_rules_violated(rules_violated_temp);
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
        checkPrereqs();
        setCheckRules(false);
    }

    return(
        <Modal size="lg" show={visible} onHide = {hide} data-testid = "auditModal">
            <Modal.Header closeButton>
                <Modal.Title>Schedule Audit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="AuditLabel">
                    <strong className="AuditLabel">Core Courses Missing</strong>
                </div>
                {missingCore.length?
                    <AuditTable courses = {missingCore}></AuditTable>: <div className="BasicCenter" data-testid = "noCoreMissing">None</div>
                }
                <div>
                    <div className="AuditLabel">
                        <strong className="AuditLabel">CISC Prerequisites Missing</strong>
                    </div>
                    {prereqs.map((p:Prereq, index0:number) => {
                        return(
                            p.prereqs.map((req:string, index1:number) => {
                                if (rules_violated.length){
                                    if(rules_violated[index0][index1]){
                                        return(
                                            <div className="BasicCenter">
                                                {req} is a prerequisite for {p.course}
                                            </div>
                                        );
                                    }
                                    //If no rules are violated
                                    if(!missing_prereqs && index0===prereqs.length-1 && index1 ===p.prereqs.length-1){
                                        return(
                                            <div className="BasicCenter" data-testid = "noPrereqsMissing">
                                                None
                                            </div>
                                        );
                                    }
                                }
                            })
                        );
                    })
                    }
                </div>
                <div className="AuditLabel">
                    <strong className="AuditLabel">CISC Electives (18 credits required)</strong>
                </div>
                <AuditTable courses={CISCelectives}></AuditTable>
                <div className="AuditLabel">
                    <strong className="AuditLabel">Breadth Electives</strong>
                </div>
                <div className="AuditLabel">
                    <strong className="AuditLabel">Arts and Humanities (3 credits required)</strong>
                </div>
                
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
                                <td className="text-center" data-testid = "artsHumanities">{breadth[0].number}</td>
                                <td className="text-center">{breadth[0].name}</td>
                                <td className="text-center">{breadth[0].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <div className="AuditLabel">
                    <strong className="AuditLabel">History and Cultural Change (3 credits required)</strong>
                </div>
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
                                <td className="text-center" data-testid = "history">{breadth[1].number}</td>
                                <td className="text-center">{breadth[1].name}</td>
                                <td className="text-center">{breadth[1].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <div className="AuditLabel">
                    <strong className="AuditLabel">Social and Behavioral Science (3 credits required)</strong>
                </div>
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
                                <td className="text-center" data-testid = "social">{breadth[2].number}</td>
                                <td className="text-center">{breadth[2].name}</td>
                                <td className="text-center">{breadth[2].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <div className="AuditLabel">
                    <strong className="AuditLabel">Mathematics, Natural Sciences, and Technology (3 credits required)</strong>
                </div>
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
                                <td className="text-center" data-testid = "technical">{breadth[3].number}</td>
                                <td className="text-center">{breadth[3].name}</td>
                                <td className="text-center">{breadth[3].credits}</td>
                            </tr>
                            :<tr></tr>}
                    </tbody>
                </Table>
                <div className="AuditLabel">
                    <strong className="AuditLabel">COE Additional Breadth (9 credits, 6 upper)</strong>
                </div>
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