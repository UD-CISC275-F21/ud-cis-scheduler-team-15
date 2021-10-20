
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
        const credits = document.getElementById("numberCredits") as HTMLInputElement
        course.number = number.value;
        course.name = name.value;
        course.credits = Number(credits.value);
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
                <button>Save Changes</button>
            </Modal.Body>
        </Modal>
    );     
}