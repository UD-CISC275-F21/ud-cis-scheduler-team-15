
import React from "react";
import {Modal} from "react-bootstrap";
import ReactDOM from "react-dom";
import App from "../App";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
export function ChangeData({index, sem_index, plan, setPlan, visible, setVisible}:
    {index: number;
    sem_index:number;
    plan: Semester[];
    setPlan: (plan: Semester[])=>void;
    visible: boolean;
    setVisible: (visible: boolean)=>void;
    }): JSX.Element{

    function setCourse(c: Course):void{
        const temp_sem: Semester = plan[sem_index];
        plan[sem_index].courses[index] = c;
        const temp_plan: Semester[] = plan;
        temp_plan[sem_index] = temp_sem;
        setPlan(temp_plan);
    }

    const hide = () => setVisible(false);

    function update():void{
        const numberHTML = document.getElementById("numberUpdate") as HTMLInputElement;
        const nameHTML  = document.getElementById("nameUpdate") as HTMLInputElement;
        const creditsHTML = document.getElementById("creditsUpdate") as HTMLInputElement;
        setCourse({number:numberHTML.value, name: nameHTML.value, credits: Number(creditsHTML.value)});
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
        //Rerender everything!!!
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById("root")
        );    
    }

    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <div className="dataEditorLabel">
                    <strong>Edit Course Number:</strong>
                    <input className="dataInput" id="numberUpdate" type="text" defaultValue={plan[sem_index].courses[index].number}></input>
                </div>
                <div className="dataEditorLabel">
                    <strong>Edit Course Name:</strong>
                    <input className="dataInput" id="nameUpdate" defaultValue={plan[sem_index].courses[index].name}></input>
                </div>
                <div className="dataEditorLabel">
                    <strong>Edit Credits:</strong>
                    <div>
                        <input className="dataInputCred" id="creditsUpdate" type="number" defaultValue={plan[sem_index].courses[index].credits}></input>
                    </div>
                </div>
                <button className="saveChanges" onClick={() => update()}>Save Changes</button>
                <button className="deleteCourse" onClick={() => del()}>Delete Course</button>
            </Modal.Body>
        </Modal>
    );     
}