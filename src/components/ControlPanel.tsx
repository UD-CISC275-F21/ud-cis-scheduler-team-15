import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import React from "react";

export function ControlPanel({showAddSemesterModal}: 
    {showAddSemesterModal: (b: boolean)=>void}): JSX.Element{
    function addSemester()  {
        showAddSemesterModal(true);
    }
    return<Row>
        <Button onClick= {addSemester} className="semesterbutton">Add Semester</Button>
    </Row>;
}

