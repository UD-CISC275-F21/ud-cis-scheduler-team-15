import React from "react";
import {Modal} from "react-bootstrap";
export function Welcome({visible, setVisible}: {visible: boolean, setVisible: (b: boolean) => void}): JSX.Element {
    const hide = () => setVisible(false);
    
    return (
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
                <p>This web app is designed to help you plan out your course schedule in order to complete your CIS Schedule.</p>
            </Modal.Body>
        </Modal>
    );
}