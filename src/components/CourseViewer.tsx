import React, { useState } from "react";
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
            <ChangeData index={index} sem_index={sem_index} plan={plan} setPlan={setPlan} visible={changePromptVis} setVisible={setChangePromptVis}></ChangeData>
        </tr>
    );
}