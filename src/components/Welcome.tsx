
import React, { useState } from "react";
import {Modal, Button} from "react-bootstrap";
export function Welcome({visible, setVisible}: {visible: boolean, setVisible: (b: boolean) => void}): JSX.Element {
    const hide = () => setVisible(false);
    
    return (
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
                <p>This is a website to help students visualize and plan out there schedule </p>
            </Modal.Body>
        </Modal>
    );
}