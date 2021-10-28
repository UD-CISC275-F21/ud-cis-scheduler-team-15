import React from "react";
import { Semester } from "../interfaces/semester";
import { Modal, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
/*import { updateLanguageServiceSourceFile } from "typescript";*/

export function SemesterMenu({sem_index, plan, setPlan, semMenuVis, setSemMenuVis}:
    {sem_index: number;
    plan: Semester[],
    setPlan: (plan: Semester[])=>void,
    semMenuVis: boolean,
    setSemMenuVis: (semMenuVis: boolean)=>void}
):JSX.Element{

    console.log(sem_index);
    console.log(plan);
    console.log(setPlan);
    const hide = () => setSemMenuVis(false);

    function clearSemester():void{
        setPlan(plan.map((s:Semester) => {
            if (s === plan[sem_index]) {
                return {...s, courses: []};
            } else {
                return {...s};
            }
        }));
        setSemMenuVis(false);
    }

    /*function deleteSemester(s:Semester):void{
        const tempPlan:Semester[] = plan;
        tempPlan.map((s:Semester) => {
            if (s != plan[sem_index]) {
                return {...s};
            }
        });
        setPlan(tempPlan);
        setSemMenuVis(false);
    }*/

    // makes a copy of the old plan but with a new course in the selected semester
    function setPlanViewer():void{
        setPlan(plan.map((s:Semester) => {
            if (s === plan[sem_index]) {
                return {...plan[sem_index], courses: [...plan[sem_index].courses, {number: "", name: "", credits: 0}]};
            } else {
                return {...s};
            }
        }));
        setSemMenuVis(false);
    }

    return(
        <Modal show={semMenuVis} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course to Semester</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Col>
                    <Button variant="success" onClick={() => setPlanViewer()}>Add a course</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => clearSemester()}>Delete all courses from semester</Button>
                </Col>
                <Col>
                    <Button variant="danger" /*onClick={() => deleteSemester(plan[sem_index])}*/>Delete semester</Button>
                </Col>
            </Modal.Body>
        </Modal>
    );
}
