import { Semester } from "../interfaces/semester";
import { SemesterTable } from "./SemesterTable";
import React from "react";

export function PlanViewer({plan, setPlan}:
    {plan: Semester[];
    setPlan: (plan: Semester[])=>void}
):JSX.Element{
    
    return(<div>
        {plan.map((s:Semester, index:number) =>{
            if(index%2 === 0 && index!=plan.length-1){
                return(
                    <div className="YearTable" key={index}>
                        <table className="YearTable">
                            <tr>
                                <td className="Fall">
                                    <SemesterTable sem_index={index} plan={plan} setPlan={setPlan}></SemesterTable>
                                </td>
                                <td className="Spring">
                                    <SemesterTable sem_index={index+1} plan={plan} setPlan={setPlan}></SemesterTable>
                                </td>
                            </tr>
                        </table>
                    </div>
                );
            }
            if(index%2 === 0 && index===plan.length-1){
                return(
                    <div className="YearTable" key={index}>
                        <table className="YearTable">
                            <tr>
                                <td className="Fall">
                                    <SemesterTable sem_index={index} plan={plan} setPlan={setPlan}></SemesterTable>
                                </td>
                                <td className="Spring">
                                </td>
                            </tr>
                        </table>
                    </div>
                );
            }
        })}
    </div>
    );
}