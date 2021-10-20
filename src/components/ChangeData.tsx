
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
    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                <div>
                    Edit Course Number: 
                    <input></input>
                </div>
                <div>
                    Edit Course Name: 
                    <input></input>
                </div>
                <div>
                    Edit Credits: 
                    <input></input>
                </div>
            </Modal.Body>
        </Modal>
    );     
}