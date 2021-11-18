import React from "react";
import { queryAllByLabelText, render, screen } from "@testing-library/react";
import { getAllByLabelText } from "@testing-library/dom";
import App from "../App";

describe("Semester Menu", () => {
    beforeEach(() => {
        render(<App />);
        const button = screen.getByRole('button', { name: "Close" });
        button.click(); // Closes welcome modal
    })

    it("is not visible before menu is opened", () => {
        const header = screen.queryByText(/Add Course to Semester/);
        expect(header).not.toBeVisible;
        const addCourse = screen.queryByText(/Add a course/);
        expect(addCourse).not.toBeVisible;
        const deleteCourses = screen.queryByText(/Delete all courses from semester/);
        expect(deleteCourses).not.toBeVisible;
        const deleteSemester = screen.queryByText(/Delete semester/);
        expect(deleteSemester).not.toBeVisible;
    })

    it("is visible after button is clicked", () => {
        const semMenuDots = screen.getAllByLabelText("Sem Menu Dots"); // Stores all semester menu buttons in a variable
        semMenuDots[0].click(); // Clicks on the first Semester Menu button (corresponds to First Year, Fall)
        const header = screen.getByText(/Add Course to Semester/);
        expect(header).toBeVisible;
        const addCourse = screen.getByText(/Add a course/);
        expect(addCourse).toBeVisible;
        const deleteCourses = screen.getByText(/Delete all courses from semester/);
        expect(deleteCourses).toBeVisible;
        const deleteSemester = screen.getByText(/Delete semester/);
        expect(deleteSemester).toBeVisible;
    })

    it("is not visible after menu is closed", () => {
        const semMenuDots = screen.getAllByLabelText("Sem Menu Dots");
        semMenuDots[0].click();
        const close = screen.getAllByLabelText("Close")[0];
        close.click(); // Close Semester Menu modal
        const header = screen.queryByText(/Add Course to Semester/);
        expect(header).not.toBeVisible;
        const addCourse = screen.queryByText(/Add a course/);
        expect(addCourse).not.toBeVisible;
        const deleteCourses = screen.queryByText(/Delete all courses from semester/);
        expect(deleteCourses).not.toBeVisible;
        const deleteSemester = screen.queryByText(/Delete semester/);
        expect(deleteSemester).not.toBeVisible;
    })

    it("can add a blank course", () => {
        expect(screen.queryByText("0")).not.toBeInTheDocument;
        const semMenuDots = screen.getAllByLabelText("Sem Menu Dots");
        semMenuDots[0].click();
        const addCourse = screen.getByText(/Add a course/);
        addCourse.click();
        const newCourse = screen.getByText("0");
        expect(newCourse).toBeInTheDocument;
    })

    it("can delete all courses from semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const courses = getAllByLabelText(semester, "Course Viewer");
        const sum = courses.length;
        expect(sum).not.toBe(0);
        const semMenuDots = screen.getAllByLabelText("Sem Menu Dots");
        semMenuDots[0].click();
        const deleteCourses = screen.getByText(/Delete all courses from semester/);
        deleteCourses.click();
        const emptySemester = screen.getAllByLabelText("Semester Table")[0];
        expect(queryAllByLabelText(emptySemester, "Course Viewer")).toStrictEqual([]);
    })

    it("can delete a semester", () => {
        const semester = screen.getAllByLabelText("Semester Table")[0];
        const semMenuDots = screen.getAllByLabelText("Sem Menu Dots");
        semMenuDots[0].click();
        const deleteSemester = screen.getByText(/Delete semester/);
        deleteSemester.click();
        expect(semester).not.toBeInTheDocument;
    })
})