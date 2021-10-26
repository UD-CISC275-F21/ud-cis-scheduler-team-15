import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { Semester } from "./interfaces/semester";
import {Welcome} from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";
import { ControlPanel} from "./components/ControlPanel";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);
    const [addSemesterModal, setAddSemesterModal] = useState<boolean>(false);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <ControlPanel addSemesterModal= {addSemesterModal} setAddSemesterModal = {setAddSemesterModal}></ControlPanel>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;