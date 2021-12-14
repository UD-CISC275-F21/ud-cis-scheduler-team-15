import React, {useEffect} from "react";
import { Course } from "../interfaces/course";
import { Semester, SemesterType, YearType } from "../interfaces/semester";
import { Button } from "react-bootstrap";

export function ControlPanel({plan, setPlan, setAuditVis}:{plan: Semester[], setPlan: (plan: Semester[])=> void, setAuditVis: (auditVis: boolean)=> void }): JSX.Element {
    
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
    //Credit https://www.code-boost.com/react-local-storage/
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
    
    function showAudit():void{
        setAuditVis(true);
    }
    return(
        <div>
            <Button onClick= {addSemester}>Add Semester</Button>
            <Button onClick= {RemoveAllSemesters}>Remove All Semesters</Button>
            <Button onClick= {showAudit}>Audit</Button>
            <Button onClick= {download}>Download</Button>
        </div>
    );
}
