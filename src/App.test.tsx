import React from "react";
import {render, screen } from "@testing-library/react";
import App from "./App";

function renderAndCloseWelcome():void{
    render(<App />);    
    const exit_button = screen.getByLabelText("Close");
    exit_button.click();
}

function openAudit():void{    
    const audit_button = screen.getByText("Audit");
    audit_button.click();
}

//Give this an array of elements to see if they are in the doc
function checkElements(elements: HTMLElement[]):void{
    for (let i=0; i<elements.length; i++){
        expect(elements[i]).toBeInTheDocument();
    }
}

test("renders UD CIS Scheduler text", () => {  
    render(<App />);
    const linkElement = screen.getByText(/UD CIS Scheduler/i);
    expect(linkElement).toBeInTheDocument();
});

test("renders Audit Modal when 'Audit' Button is clicked", () => {
    renderAndCloseWelcome();
    openAudit();
    const AuditModal = screen.getByTestId("auditModal");
    expect(AuditModal).toBeInTheDocument();
});

test("Preloaded Schedule misses no core courses or prereqs", () => {
    renderAndCloseWelcome();
    openAudit();
    const cores = screen.getByTestId("noCoreMissing");
    const prereqs = screen.getByTestId("noPrereqsMissing");
    expect(cores).toBeInTheDocument();
    expect(prereqs).toBeInTheDocument();
});

test("Breadth electives are present in the preloaded schedule", () => {
    renderAndCloseWelcome();
    openAudit();
    const artsHumanities = screen.getByTestId("artsHumanities");
    const history = screen.getByTestId("history");
    const social = screen.getByTestId("social");
    const technical = screen.getByTestId("technical");
    const electives = [artsHumanities, history, social, technical];
    checkElements(electives);
});

test("Removing CISC 108 causes it to apppear in missing courses, and the prereq rules are flagged for 181 and 210", () => {
    renderAndCloseWelcome();
    const CISC108:HTMLElement= screen.getByText("CISC108");
    const dots_button = CISC108.parentElement?.getElementsByClassName("split")[0].getElementsByClassName("dotButton")[0] as HTMLElement;
    dots_button.click();
    const delete_course_button = screen.getByText("Delete Course");
    delete_course_button.click();
    openAudit();
    const CISC108_missing = screen.getByText("Introduction to Computer Science I");
    const CISC181_violation = screen.getByText("CISC108 is a prerequisite for CISC181");
    const CISC210_violation = screen.getByText("CISC108 is a prerequisite for CISC210");
    checkElements([CISC108_missing, CISC181_violation, CISC210_violation])
});