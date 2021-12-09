import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { Semester} from "./interfaces/semester";
import { Welcome } from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";
import { AuditModal } from "./components/AuditModal";
import { ControlPanel } from "./components/ControlPanel";
function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);
    const [auditVis, setAuditVis] = useState<boolean>(false);

    
    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <ControlPanel plan={plan} setPlan={setPlan} setAuditVis={setAuditVis}></ControlPanel>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
            <AuditModal plan={plan} visible={auditVis} setVisible={setAuditVis}></AuditModal>
        </div>
    );
}

export default App;