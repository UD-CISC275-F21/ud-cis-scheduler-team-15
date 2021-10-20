
import React from "react";
import {Modal} from "react-bootstrap";
import { Course } from "../interfaces/course";
export function ChangeData({course, setCourse, visible, setVisible}:
    {course: Course;
    setCourse: (course: Course)=>void;
    visible: boolean;
    setVisible: (visible: boolean)=>void;
    }): JSX.Element{
        return(
            <Modal show={visible} onHide = {setVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course Info</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                    <div>Edits</div>
                </Modal.Body>
            </Modal>
        )     
    }