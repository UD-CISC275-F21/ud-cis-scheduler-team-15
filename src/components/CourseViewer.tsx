import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseViewer({course, dotsStyle, setDotsStyle, setChangePromptVis}: 
    {course: Course;
    dotsStyle: {display: string};
    setDotsStyle: (docStyle: {display: string})=>void;
    setChangePromptVis: (vis: boolean)=>void;
    }
    
): JSX.Element {
    return (
        <Table striped={true} bordered hover
            // Citation: https://stackoverflow.com/questions/61126014/how-to-show-button-while-hover-over-box-using-react
            onMouseEnter={() => {
                setDotsStyle({display: "block"});
            }}
            onMouseLeave={() => {
                setDotsStyle({display: "none"});
            }}>
            <tbody>
                <tr>
                    <td>{course.number}</td>
                    <td>{course.name}</td>
                    <td className = "split">
                        <div className = "credits">{course.credits}</div>
                        <button className = "dotButton" style = {dotsStyle} onClick = {()=>setChangePromptVis(true)}>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                        </button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}