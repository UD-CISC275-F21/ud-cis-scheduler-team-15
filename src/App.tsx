import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import COURSES from "./assets/courses.json";
import { Semester, SemesterType, YearType } from "./interfaces/semester";
import { Welcome } from "./components/Welcome";
import { PlanViewer } from "./components/PlanViewer";
import { AuditModal } from "./components/AuditModal";
function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>(COURSES as Semester[]);
    const [visible, setVisible] = useState<boolean>(true);
    const [auditVis, setAuditVis] = useState<boolean>(false);
    function addSemester(){
        let yearType = YearType.FirstYear;
        let semesterType = SemesterType.Fall;
        if(plan.length === 0){
            yearType = YearType.FirstYear;
            semesterType = SemesterType.Fall;
        }else if (plan[plan.length - 1].semester === "Fall") {
            yearType = plan[plan.length - 1].year;
            semesterType = SemesterType.Spring;
        }else{
            semesterType = SemesterType.Fall;
            if(plan[plan.length - 1].year === "First Year"){
                yearType = YearType.SecondYear;
            }else if(plan[plan.length - 1].year === "Second Year"){
                yearType = YearType.ThirdYear;
            }else if(plan[plan.length - 1].year === "Third Year"){
                yearType = YearType.FourthYear;
            }
        }
        const newSemester = {year: yearType, semester: semesterType, courses: []};
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
            <Button onClick = {addSemester}>Add Semester</Button>
            <Button onClick= {RemoveAllSemesters}>Remove All Semesters</Button>
            <Button onClick= {showAudit}>Audit</Button>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
            <AuditModal plan={plan} visible={auditVis} setVisible={setAuditVis}></AuditModal>
        </div>
    );
}

export default App;