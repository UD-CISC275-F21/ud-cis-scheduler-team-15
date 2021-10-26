import React from "react";
import { Semester } from "../interfaces/semester";
import {Modal} from "react-bootstrap";

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
    /*
    function setSemester(s:Semester):void{
        const temp_plan: Semester[] = plan;
        temp_plan[sem_index] = s;
        setPlan(temp_plan);           
    }
    */

    return(
        <Modal show={semMenuVis} onHide = {hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
        </Modal>
    );
}