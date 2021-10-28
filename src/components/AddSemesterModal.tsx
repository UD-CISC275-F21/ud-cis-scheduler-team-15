import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import React from "react";

export function AddSemesterModal({addSemesterModal, showAddSemesterModal}:
    {addSemesterModal: boolean, showAddSemesterModal: (b: boolean)=> void}): JSX.Element {
    const hide = () => showAddSemesterModal(false);
    function saveSemester(){
        
    }
    return ( 
        <Modal show={addSemesterModal} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
                New Semester
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveSemester}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}