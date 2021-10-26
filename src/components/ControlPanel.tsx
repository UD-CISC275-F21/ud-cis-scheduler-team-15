import { useState } from "react";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import React from "react";

export function ControlPanel({addSemesterModal, setAddSemesterModal}: 
    {addSemesterModal: boolean, setAddSemesterModal: (b: boolean)=>void}): JSX.Element{
    return<Row>
        <Button className="semesterbutton">Add Semester</Button>
    </Row>;
}

