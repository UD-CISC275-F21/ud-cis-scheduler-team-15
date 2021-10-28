import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { Semester } from "./interfaces/semester";
import { Welcome } from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";
import { ControlPanel} from "./components/ControlPanel";
import { AddSemesterModal } from "./components/AddSemesterModal";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);
    const [addSemesterModal, showAddSemesterModal] = useState<boolean>(false);
    function addSemester(newSemester: Semester){
        setPlan([...plan, newSemester]);
    }
    console.log(plan[0].courses);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <AddSemesterModal addSemesterModal = {addSemesterModal} showAddSemesterModal = {showAddSemesterModal} addSemester = {addSemester}></AddSemesterModal>
            <ControlPanel showAddSemesterModal = {showAddSemesterModal}></ControlPanel>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;