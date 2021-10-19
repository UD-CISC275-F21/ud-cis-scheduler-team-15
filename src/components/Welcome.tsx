
import React, { useState } from "react";
import {Modal, Button} from "react-bootstrap";
export function Welcome(): JSX.Element {
    return (
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
                <p>This is a website to help students visualize and plan out there schedule  </p>
            </Modal.Body>
      
            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}