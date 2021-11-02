import React from "react";
import {Modal} from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function AuditModal({plan, visible, setVisible}:
    {plan: Semester[];
    visible: boolean;
    setVisible: (visible: boolean)=>void
    }): JSX.Element{
    const hide = () => setVisible(false);

    //To appease the linter for now
    console.log(plan);

    return(
        <Modal show={visible} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Audit</Modal.Title>
            </Modal.Header>
        </Modal>
    );
}