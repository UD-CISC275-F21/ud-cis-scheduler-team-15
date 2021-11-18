import React from "react";
import { render, screen } from "@testing-library/react";
import COURSES from "../assets/courses.json";
import { Semester } from "../interfaces/semester";
import { SemesterTable } from "./SemesterTable"

describe("a semester in the form of a table", () => {
    
    render(<SemesterTable sem_index={0} plan={COURSES as Semester[]} setPlan={() => {}}/>);
    screen.debug();

    test("checks for course number, course name and credits", () => {

        const courseNumber = screen.getByText(/Course Number/);
        expect(courseNumber).toBeInTheDocument();
    
        const courseName = screen.getByText(/Course Name/);
        expect(courseName).toBeInTheDocument();
    
        const credits = screen.getByText(/Credits/);
        expect(credits).toBeInTheDocument();
    });
});