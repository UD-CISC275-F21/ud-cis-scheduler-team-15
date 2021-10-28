import { useState } from "react";
import { Button, Modal, ButtonGroup, Col, ToggleButton } from "react-bootstrap";
import React from "react";
import { Semester, SemesterType, YearType } from "../interfaces/semester";

export function AddSemesterModal({addSemesterModal, showAddSemesterModal, addSemester}:
    {addSemesterModal: boolean, showAddSemesterModal: (b: boolean)=> void, addSemester: (s: Semester) => void}): JSX.Element {
    const hide = () => showAddSemesterModal(false);
    function saveSemester(){
        addSemester({year: yearType, semester: semesterType, courses: []});
    }
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");
    const [yearType, setYearType] = useState<YearType>(YearType.FirstYear);
    const [semesterType, setSemesterType] = useState<SemesterType>(SemesterType.Fall);
    const radios = [
        { name: "1", value: YearType.FirstYear },
        { name: "2", value: YearType.SecondYear },
        { name: "3", value: YearType.ThirdYear },
        { name: "4", value: YearType.FourthYear }
    ];
    const radios2 = [
        { name: "Fall", value: SemesterType.Fall },
        { name: "Spring", value: SemesterType.Spring }
    ];
    return <Col>
        <Modal show={addSemesterModal} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Semester</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div><strong>Year of Semester</strong></div>
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
                </ButtonGroup>
            </Modal.Body>
            <Modal.Body>
                <div><strong>Semester Season</strong></div>
                <ButtonGroup>
                    {radios2.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={semesterType === radio.value}
                            onChange={(e) => setSemesterType((e.currentTarget.value) as SemesterType)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveSemester}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    </Col>;
}