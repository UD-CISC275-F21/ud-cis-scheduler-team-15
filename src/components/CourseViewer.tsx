import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { ChangeData } from "./ChangeData";

export function CourseViewer({index, sem_index, plan, setPlan, setRenderSemester}: 
    {index: number;
    sem_index: number;
    plan: Semester[];
    setPlan: (plan: Semester[])=> void;
    setRenderSemester: (renderSemester: boolean)=>void;
    }
    
): JSX.Element {
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);
    const [renderCourse, setRenderCourse] = useState<boolean>(false);

    if (renderCourse){
        setRenderSemester(true);
        setRenderCourse(false);
    }
    
    return (
        <>
            <td className="courseNum" aria-label="Course Number"
                onMouseEnter={() => {
                    setDotsStyle({display: "block"});
                }}
                onMouseLeave={() => {
                    setDotsStyle({display: "none"});
                }}>{
                    plan[sem_index].courses[index].number
                }
            </td>
            <td className="courseName" aria-label="Course Name"
                onMouseEnter={() => {
                    setDotsStyle({display: "block"});
                }}
                onMouseLeave={() => {
                    setDotsStyle({display: "none"});
                }}>{
                    plan[sem_index].courses[index].name
                }
            </td>
            <td className = "split" aria-label="Credits"
                // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
                onMouseEnter={() => {
                    setDotsStyle({display: "block"});
                }}
                onMouseLeave={() => {
                    setDotsStyle({display: "none"});
                }}>
                <div className = "credits">{plan[sem_index].courses[index].credits}</div>
                <button className = "dotButton" data-testid = "dots" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                    <div className = "dot"></div>
                    <div className = "dot"></div>
                    <div className = "dot"></div>
                </button>
            </td>
            <ChangeData index={index} sem_index={sem_index} plan={plan} setPlan={setPlan} visible={changePromptVis} setVisible={setChangePromptVis} setRenderSemester={setRenderCourse}></ChangeData>
        </>
    );
}