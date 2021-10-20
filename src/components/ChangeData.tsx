
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
        const number = document.getElementById("numberUpdate") as HTMLInputElement;
        const name  = document.getElementById("nameUpdate") as HTMLInputElement;
        const credits = document.getElementById("creditsUpdate") as HTMLInputElement;
        console.log(credits);
        const tempCourse = {number:number.value, name:name.value, credits:credits.valueAsNumber};
        setCourse(tempCourse);
    }
    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <div>
                    Edit Course Number: 
                    <input id="numberUpdate"></input>
                </div>
                <div>
                    Edit Course Name: 
                    <input id="nameUpdate"></input>
                </div>
                <div>
                    Edit Credits: 
                    <input id="creditsUpdate" type="number"></input>
                </div>
                <button onClick={() => update()}>Save Changes</button>
            </Modal.Body>
        </Modal>
    );     
}