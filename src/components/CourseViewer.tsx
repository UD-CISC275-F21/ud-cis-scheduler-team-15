import React, { useState } from "react";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { ChangeData } from "./ChangeData";

export function CourseViewer({key, index, sem_index, plan, setPlan}: 
    {key: number
    index: number;
    sem_index: number;
    plan: Semester[];
    setPlan: (plan: Semester[])=> void;
    }
    
): JSX.Element {
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);

    function setCourse(c: Course):void{
        const temp_sem: Semester = plan[sem_index];
        plan[sem_index].courses[index] = c;
        const temp_plan: Semester[] = plan;
        temp_plan[sem_index] = temp_sem;
        setPlan(temp_plan);
    }
    
    return (
        <tr key={key}
        // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
            onMouseEnter={() => {
                setDotsStyle({display: "block"});
            }}
            onMouseLeave={() => {
                setDotsStyle({display: "none"});
            }}>
            <td className="courseNum">{plan[sem_index].courses[index].number}</td>
            <td className="courseName">{plan[sem_index].courses[index].name}</td>
            <td className = "split">
                <div className = "credits">{plan[sem_index].courses[index].credits}</div>
                <button className = "dotButton" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                    <div className = "dot"></div>
                    <div className = "dot"></div>
                    <div className = "dot"></div>
                </button>
            </td>
            <ChangeData course={plan[sem_index].courses[index]} setCourse={setCourse} visible={changePromptVis} setVisible={setChangePromptVis} i={0}></ChangeData>
        </tr>
    );
}