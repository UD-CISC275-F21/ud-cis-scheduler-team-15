import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterTable } from "./SemesterTable";

export function PlanViewer({plan, setPlan}:
    {plan: Semester[];
    setPlan: (plan: Semester[])=>void}
):JSX.Element{
    
    return(<div>
        {plan.map((s:Semester, index:number) =>{
            return(
                <div key={index}>
                    <SemesterTable sem_index={index} plan={plan} setPlan={setPlan}></SemesterTable>
                </div>
            );
        })}
    </div>
    );
}