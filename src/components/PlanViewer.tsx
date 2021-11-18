import { Semester } from "../interfaces/semester";
import { SemesterTable } from "./SemesterTable";
import React from "react";

export function PlanViewer({plan, setPlan}:
    {plan: Semester[];
    setPlan: (plan: Semester[])=>void}
):JSX.Element{
    
    return(
        <div>
            {plan.map((s:Semester, index:number) =>{
                if(index%2 === 0 && index!=plan.length-1){
                    return(
                        <div className="YearTable" key={index}>
                            <table className="YearTable">
                                <tbody>
                                    <tr>
                                        <td className="Fall" aria-label="Semester Table">
                                            <SemesterTable sem_index={index} plan={plan} setPlan={setPlan}></SemesterTable>
                                        </td>
                                        <td className="Spring" aria-label="Semester Table">
                                            <SemesterTable sem_index={index+1} plan={plan} setPlan={setPlan}></SemesterTable>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                }
                if(index%2 === 0 && index===plan.length-1){
                    return(
                        <div className="YearTable" key={index}>
                            <table className="YearTable">
                                <tbody>
                                    <tr>
                                        <td className="Fall" aria-label="Semester Table">
                                            <SemesterTable sem_index={index} plan={plan} setPlan={setPlan}></SemesterTable>
                                        </td>
                                        <td className="Spring" aria-label="Semester Table">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                }
            })}
        </div>
    );
}