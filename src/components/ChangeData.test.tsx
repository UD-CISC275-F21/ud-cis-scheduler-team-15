import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

//Give this an array of elements to see if they are in the doc
function checkElements(elements: HTMLElement[]):void{
    for (let i=0; i<elements.length; i++){
        expect(elements[i]).toBeInTheDocument();
    }
}

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Can edit course number, name, and credits", () => {
        const CISC108:HTMLElement= screen.getByText("CISC108");
        const dots_button = CISC108.parentElement?.getElementsByClassName("split")[0].getElementsByClassName("dotButton")[0] as HTMLElement;
        dots_button.click();

        userEvent.clear(screen.getByTestId("numberUpdate"));
        userEvent.type(screen.getByTestId("numberUpdate"), "TEST0");

        userEvent.clear(screen.getByTestId("nameUpdate"));
        userEvent.type(screen.getByTestId("nameUpdate"), "TEST1");

        userEvent.clear(screen.getByTestId("creditsUpdate"));
        userEvent.type(screen.getByTestId("creditsUpdate"), "100");

        screen.getByTestId("saveCourseChanges").click();
        const CourseNumber = screen.getByText("TEST0");    
        const CourseName = screen.getByText("TEST1");
        const CourseCredits = screen.getByText("100");
        checkElements([CourseNumber, CourseName, CourseCredits]);
    });
});