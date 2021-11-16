import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";
import React, { useState } from "react";
import { SemesterMenu } from "./SemesterMenu";

export function SemesterTable({sem_index, plan, setPlan}:
    {sem_index: number;
    plan: Semester[];
    setPlan: (plan: Semester[])=>void}):
    JSX.Element{

    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);

    if ((plan[sem_index].year === "Pool of Courses") || (plan[sem_index].semester === "Pool of Courses")) {
        return (
            <div className = "SemesterTable">
                <table // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
                    onMouseEnter={() => {
                        setDotsStyle({display: "block"});
                    }}
                    onMouseLeave={() => {
                        setDotsStyle({display: "none"});
                    }} className="SemesterHeader">
                    <td className = "split">
                        <strong className="poolLabel">{plan[sem_index].semester}</strong>
                        <button aria-label = "Sem Menu Dots" className = "dotButton" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                        </button>
                    </td>
                </table>
                <SemesterMenu sem_index={sem_index} plan={plan} setPlan={setPlan} semMenuVis={changePromptVis} setSemMenuVis={setChangePromptVis}></SemesterMenu>
    
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
    } else {
        return (
            <div className = "SemesterTable">
                <table // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
                    onMouseEnter={() => {
                        setDotsStyle({display: "block"});
                    }}
                    onMouseLeave={() => {
                        setDotsStyle({display: "none"});
                    }} className="SemesterHeader">
                    <td className="yearLabel">
                        <strong>{plan[sem_index].year}</strong>
                    </td>
                    <td className = "split">
                        <strong className="semLabel">{plan[sem_index].semester}</strong>
                        <button aria-label = "Sem Menu Dots" className = "dotButton" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                        </button>
                    </td>
                </table>
                <SemesterMenu sem_index={sem_index} plan={plan} setPlan={setPlan} semMenuVis={changePromptVis} setSemMenuVis={setChangePromptVis}></SemesterMenu>
    
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
    
}