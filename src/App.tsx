import "./App.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import COURSES from "./assets/courses.json";
import { Semester, SemesterType, YearType } from "./interfaces/semester";
import { Course } from "./interfaces/course";
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
        if(plan.length - 1 === 0){
            yearType = YearType.FirstYear;
            semesterType = SemesterType.Fall;
        }else if (plan[plan.length - 2].semester === "Fall") {
            yearType = plan[plan.length - 2].year;
            semesterType = SemesterType.Spring;
        }else{
            semesterType = SemesterType.Fall;
            if(plan[plan.length - 2].year === "First Year"){
                yearType = YearType.SecondYear;
            }else if(plan[plan.length - 2].year === "Second Year"){
                yearType = YearType.ThirdYear;
            }else if(plan[plan.length - 2].year === "Third Year"){
                yearType = YearType.FourthYear;
            }else if(plan[plan.length - 2].year === "Fourth Year"){
                yearType = YearType.FifthYear;
            }
        }
        console.log(plan.length);
        const newSemester = {year: yearType, semester: semesterType, courses: []};
        console.log(newSemester.year);
        setPlan([...plan.slice(0,-1),
            newSemester,
            plan[plan.length - 1]]);
            
    }
    function showAudit():void{
        setAuditVis(true);
    }
    function RemoveAllSemesters():void{
        setPlan(plan.filter(s => s.year === "Pool of Courses"));
    }
    function download(){
        function semCourses(c: Course[]){
            const semCourse = c.map((q: Course) => q.number + "," + q.name + "," + q.credits);
            return semCourse;
        }
        const csvContent = "data:text/csv;charset=utf-8," + "Year," + "Semester," + "ID," + "Title," + "Credits," + plan.map((s: Semester) => "\n" + s.year + "," + s.semester + "," + semCourses(s.courses));
        const hiddenElement = document.createElement("a");  
        hiddenElement.href = encodeURI(csvContent);  
        hiddenElement.target = "_blank";
        hiddenElement.download = "Schedule.csv";  
        hiddenElement.click();  
    }
    useEffect(() => {
        if(sessionStorage.getItem("localplan") != null){
            const json = sessionStorage.getItem("localplan");
            const savedPlan = JSON.parse(json || "");
            if(savedPlan){
                setPlan(savedPlan);
            }
        }
    }, []);
    useEffect(() => {
        if(plan){
            const json = JSON.stringify(plan);
            sessionStorage.setItem("localplan", json);
        }
    }, [plan]);
    return (
        <div className="App">
            <p>UD CIS Scheduler</p>
            <Button onClick= {addSemester}>Add Semester</Button>
            <Button onClick= {RemoveAllSemesters}>Remove All Semesters</Button>
            <Button onClick= {showAudit}>Audit</Button>
            <Button onClick= {download}>Download</Button>
            <PlanViewer plan={plan} setPlan={setPlan}></PlanViewer>
            <Welcome visible = {visible} setVisible = {setVisible}></Welcome>
            <AuditModal plan={plan} visible={auditVis} setVisible={setAuditVis}></AuditModal>
        </div>
    );
}

export default App;