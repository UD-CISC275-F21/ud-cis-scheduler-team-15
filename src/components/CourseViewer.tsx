import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { ChangeData } from "./ChangeData";

export function CourseViewer({index, semester, setSemester}: 
    {index: number;
    semester: Semester;
    setSemester: (semester: Semester)=> void;
    }
    
): JSX.Element {
    const [dotsStyle, setDotsStyle] = useState({display: "none"});
    const [changePromptVis, setChangePromptVis] = useState<boolean>(false);

    function setCourse(c: Course):void{
        const temp_sem: Semester = semester;
        semester.courses[index] = c;
        setSemester(temp_sem);
    }
    
    return (
        <div>
            <Table className = "courseViewer" striped={true} bordered hover
                // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
                onMouseEnter={() => {
                    setDotsStyle({display: "block"});
                }}
                onMouseLeave={() => {
                    setDotsStyle({display: "none"});
                }}>
                <tbody>
                    <tr>
                        <td className="courseNum">{semester.courses[index].number}</td>
                        <td className="courseName">{semester.courses[index].name}</td>
                        <td className = "split">
                            <div className = "credits">{semester.courses[index].credits}</div>
                            <button className = "dotButton" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                                <div className = "dot"></div>
                                <div className = "dot"></div>
                                <div className = "dot"></div>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <ChangeData course={semester.courses[index]} setCourse={setCourse} visible={changePromptVis} setVisible={setChangePromptVis} i={0}></ChangeData>
        </div>
    );
}