import React from "react";
import { render, screen } from "@testing-library/react";
import { getAllByLabelText, getByTestId, queryByTestId, getByText, getByLabelText } from "@testing-library/dom";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    beforeEach(() => {
        render(<App />);
        const button = screen.getByRole("button", { name: "Close" });
        button.click(); // Closes welcome modal
    });

    it("displays a semester header", () => {
        const semesters = screen.getAllByLabelText("Semester Table");
        expect(semesters).toBeVisible;
        const semester = semesters[0];
        const year = getByText(semester, "First Year");
        expect(year).toBeVisible;
        const sem = getByText(semester, "Fall");
        expect(sem).toBeVisible;
    });

    it("displays column headers in the semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const number = getByText(semester, "Course Number");
        expect(number).toBeVisible;
        const name = getByText(semester, "Course Name");
        expect(name).toBeVisible;
        const credits = getByText(semester, "Credits");
        expect(credits).toBeVisible;
    });

    it("displays courses in the semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const courses = getAllByLabelText(semester, "Course Viewer");
        expect(courses).toBeVisible;
        const cisc108 = courses[0];
        const number = getByText(cisc108, "CISC108");
        expect(number).toBeVisible;
        const name = getByText(cisc108, "Introduction to Computer Science I");
        expect(name).toBeVisible;
        const credits = getByText(cisc108, "3");
        expect(credits).toBeVisible;
    });

    it("hides dots when cursor is not hovering over course", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const courses = getAllByLabelText(semester, "Course Viewer");
        const cisc108 = courses[0];
        const button = queryByTestId(cisc108, "dots");
        expect(button).not.toBeVisible;
    });

    it("displays dots when cursor is hovering over course", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const courses = getAllByLabelText(semester, "Course Viewer");
        const cisc108 = courses[0];
        const number = getByLabelText(cisc108, "Course Number");
        const name = getByLabelText(cisc108, "Course Name");
        const credits = getByLabelText(cisc108, "Credits");
        const button = getByTestId(cisc108, "dots");
        expect(button).not.toBeVisible;
        userEvent.hover(number); // Hover over course number
        expect(button).toBeVisible;
        userEvent.unhover(number);
        expect(button).not.toBeVisible;
        userEvent.hover(name); // Hover over course name
        expect(button).toBeVisible;
        userEvent.unhover(name);
        expect(button).not.toBeVisible;
        userEvent.hover(credits); // Hover over credits
        expect(button).toBeVisible;
        userEvent.unhover(credits);
        expect(button).not.toBeVisible;
    });

    it("hides dots when not hovering over a semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const button = getByLabelText(semester, "Sem Menu Dots");
        expect(button).not.toBeVisible;
    });

    it("displays dots when hovering over a semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const button = getByLabelText(semester, "Sem Menu Dots");
        const header = getByTestId(semester, "Header");
        expect(button).not.toBeVisible;
        userEvent.hover(header);
        expect(button).toBeVisible;
        userEvent.unhover(header);
        expect(button).not.toBeVisible;
    });
});