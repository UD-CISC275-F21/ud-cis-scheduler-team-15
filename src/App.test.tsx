import React from "react";
import { render, screen } from "@testing-library/react";
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
    for (let i = 0; i<electives.length; i++){
        expect(electives[i]).toBeInTheDocument();
    }
});
