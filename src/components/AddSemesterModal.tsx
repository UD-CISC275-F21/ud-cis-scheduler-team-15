import { useState } from "react";
import { Button, Modal, ButtonGroup, Col, ToggleButton } from "react-bootstrap";
import React from "react";
import { Semester, SemesterType, YearType } from "../interfaces/semester";
import { Course } from "../interfaces/course";
import { CourseViewer } from "./CourseViewer";
import  COURSES  from "../assets/courses.json";

export function AddSemesterModal({addSemesterModal, showAddSemesterModal, addSemester}:
    {addSemesterModal: boolean, showAddSemesterModal: (b: boolean)=> void, addSemester: (s: Semester) => void}): JSX.Element {
    const hide = () => showAddSemesterModal(false);
    // function saveSemester(){
    //     addSemester({year: YearType.FirstYear, semester: SemesterType.Fall , courses: COURSES(Course[] as COURSES)});
    //}
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");
    const [yearType, setYearType] = useState<YearType>(YearType.FirstYear);
    const radios = [
        { name: "1", value: YearType.FirstYear },
        { name: "2", value: YearType.SecondYear },
        { name: "3", value: YearType.ThirdYear },
        { name: "4", value: YearType.FourthYear }
    ];
    return ( 
        <Modal show={addSemesterModal} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Semester</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={yearType === radio.value}
                            onChange={(e) => setYearType((e.currentTarget.value) as YearType)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>)
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" /*onClick={saveSemester}*/>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}