import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import React from "react";

export function ControlPanel({showAddSemesterModal}: 
    {showAddSemesterModal: (b: boolean)=>void}): JSX.Element{
    function addSemester()  {
        showAddSemesterModal(true);
    }
    return<Col>
        <Button onClick= {addSemester} className="semesterbutton">Add Semester</Button>
    </Col>;
}

