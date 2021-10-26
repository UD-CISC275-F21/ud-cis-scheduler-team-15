import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseViewer } from "./CourseViewer";

export function DisplayCourses({semester, dotsStyle, setDotsStyle, setChangePromptVis}:
    {semester: Semester;
    dotsStyle: {display: string};
    setDotsStyle: (docStyle: {display: string})=>void;
    setChangePromptVis: (vis: boolean)=>void;}):
    JSX.Element{
        return (
            <div>
                {semester.courses.map((c:Course, index:number) => { 
                    return (<tr key={index}>
                        <CourseViewer course={c} dotsStyle={dotsStyle} setDotsStyle={setDotsStyle} setChangePromptVis={setChangePromptVis}></CourseViewer>
                        </tr>);
                    }
                )}
            </div>
        )
    }