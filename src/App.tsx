import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import COURSES from "./assets/courses.json";
import { Semester } from "./interfaces/semester";
import { Welcome } from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";
import { ControlPanel} from "./components/ControlPanel";
import { AddSemesterModal } from "./components/AddSemesterModal";
import { AuditModal } from "./components/AuditModal";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);
    const [addSemesterModal, showAddSemesterModal] = useState<boolean>(false);
    const [auditVis, setAuditVis] = useState<boolean>(false);

    function addSemester(newSemester: Semester){
        setPlan([...plan, newSemester]);
    }
    function showAudit():void{
        setAuditVis(true);
    }
    function RemoveAllSemesters(){
        setPlan([]);
    }

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <AddSemesterModal addSemesterModal = {addSemesterModal} showAddSemesterModal = {showAddSemesterModal} addSemester = {addSemester}></AddSemesterModal>
            <ControlPanel showAddSemesterModal = {showAddSemesterModal}></ControlPanel>
            <Button onClick= {RemoveAllSemesters}>Remove All Semesters</Button>
            <Button onClick= {showAudit}>Audit</Button>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
            <AuditModal plan={plan} visible={auditVis} setVisible={setAuditVis}></AuditModal>
        </div>
    );
}

export default App;