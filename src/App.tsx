import "./App.css";
import React, { useState } from "react";
import COURSES from "./assets/courses.json";
import { Semester } from "./interfaces/semester";
import {Welcome} from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);

    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
        </div>
    );
}

export default App;