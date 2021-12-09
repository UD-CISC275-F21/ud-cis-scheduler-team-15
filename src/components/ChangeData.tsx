
import React, { useState } from "react";
import {Modal} from "react-bootstrap";
//import ReactDOM, { render } from "react-dom";
//import App from "../App";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function ChangeData({index, sem_index, plan, setPlan, visible, setVisible, setRenderSemester}:
    {index: number;
    sem_index:number;
    plan: Semester[];
    setPlan: (plan: Semester[])=>void;
    visible: boolean;
    setVisible: (visible: boolean)=>void;
    setRenderSemester: (renderSemester: boolean)=>void;
    }): JSX.Element{

    const [courseNumber, setCourseNumber] = useState<string>(plan[sem_index].courses[index].number);
    const [courseName, setCourseName] = useState<string>(plan[sem_index].courses[index].name);
    const [courseCredits, setCourseCredits] = useState<number>(plan[sem_index].courses[index].credits);

    function setCourse(c: Course):void{
        const temp_sem: Semester = plan[sem_index];
        plan[sem_index].courses[index] = c;
        const temp_plan: Semester[] = [...plan];
        temp_plan[sem_index] = temp_sem;
        setPlan(temp_plan);
    }

    const hide = () => setVisible(false);

    function update():void{
        setCourse({number: courseNumber, name: courseName, credits: courseCredits});
        hide();
    }

    function del():void{
        const temp_courses: Course[]= plan[sem_index].courses;
        temp_courses.splice(index,1);
        const temp_sem: Semester = plan[sem_index];
        temp_sem.courses = temp_courses;
        const temp_plan = plan;
        temp_plan[sem_index] = temp_sem;
        setPlan(temp_plan);    
        hide();
        setRenderSemester(true);
        //Rerender everything!!
        /*ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById("root")
        );
        */
    }

    return(
        <Modal show={visible} onHide = {hide} data-testid="changeData">
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <div className="dataEditorLabel">
                    <strong>Edit Course Number:</strong>
                    <input className="dataInput" id="numberUpdate" data-testid="numberUpdate" type="text" defaultValue={plan[sem_index].courses[index].number} onChange={(e) => setCourseNumber(e.target.value)}></input>
                </div>
                <div className="dataEditorLabel">
                    <strong>Edit Course Name:</strong>
                    <input className="dataInput" id="nameUpdate" data-testid="nameUpdate" defaultValue={plan[sem_index].courses[index].name} onChange={(e) => setCourseName(e.target.value)}></input>
                </div>
                <div className="dataEditorLabel">
                    <strong>Edit Credits:</strong>
                    <div>
                        {/* credit:
                        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
                        https://github.com/UD-CISC275-F21/ta-trainer/blob/e7e3538c946ac04cd9a6b225ef2b93270ecf32af/src/components/AddCardModal.tsx
                        */}
                        <input className="dataInputCred" id="creditsUpdate" data-testid="creditsUpdate" type="number" defaultValue={plan[sem_index].courses[index].credits} onChange={(e) => setCourseCredits(parseInt(e.target.value))}></input>
                    </div>
                </div>
                <button className="saveChanges" data-testid = "saveCourseChanges" onClick={() => update()}>Save Changes</button>
                <button className="deleteCourse" onClick={() => del()}>Delete Course</button>
            </Modal.Body>
        </Modal>
    );     
}