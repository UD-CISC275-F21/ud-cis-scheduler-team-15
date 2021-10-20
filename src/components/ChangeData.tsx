
import React from "react";
import {Modal} from "react-bootstrap";
import { Course } from "../interfaces/course";
export function ChangeData({course, setCourse, visible, setVisible}:
    {course: Course;
    setCourse: (course: Course)=>void;
    visible: boolean;
    setVisible: (visible: boolean)=>void;
    }): JSX.Element{

    const hide = () => setVisible(false);

    function update():void{
        const numberHTML = document.getElementById("numberUpdate") as HTMLInputElement;
        const nameHTML  = document.getElementById("nameUpdate") as HTMLInputElement;
        const creditsHTML = document.getElementById("creditsUpdate") as HTMLInputElement;
        setCourse({number:numberHTML.value, name: nameHTML.value, credits: Number(creditsHTML.value)});
        hide();
    }
    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <div>
                    Edit Course Number: 
                    <input id="numberUpdate" type="text" defaultValue={course.number}></input>
                </div>
                <div>
                    Edit Course Name: 
                    <input id="nameUpdate" defaultValue={course.name}></input>
                </div>
                <div>
                    Edit Credits: 
                    <input id="creditsUpdate" type="number" defaultValue={course.credits}></input>
                </div>
                <button onClick={() => update()}>Save Changes</button>
            </Modal.Body>
        </Modal>
    );     
}