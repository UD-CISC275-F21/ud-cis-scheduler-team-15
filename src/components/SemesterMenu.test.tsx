import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Semester Menu", () => {
    beforeEach(() => {
        render(<App />);
        const button = screen.getByRole('button', { name: "Close" });
        button.click(); // Closes welcome modal
    })

    it("is not visible before button is clicked", () => {
        expect(screen.queryByText(/Add Course to Semester/)).not.toBeVisible;
        expect(screen.queryByText(/Add a course/)).not.toBeVisible;
        expect(screen.queryByText(/Delete all courses from semester/)).not.toBeVisible;
        expect(screen.queryByText(/Delete semester/)).not.toBeVisible;
    })

    it("is visible after button is clicked", () => {
        screen.getAllByLabelText("Sem Menu Dots")[0].click(); // Clicks on the first Semester Menu button (corresponds to First Year, Fall)
        expect(screen.getByText(/Add Course to Semester/)).toBeVisible;
        expect(screen.getByText(/Add a course/)).toBeVisible;
        expect(screen.getByText(/Delete all courses from semester/)).toBeVisible;
        expect(screen.getByText(/Delete semester/)).toBeVisible;
    })

    it("is not visible after menu is closed", () => {
        screen.getAllByLabelText("Sem Menu Dots")[0].click();
        screen.getByLabelText("Close").click(); // Close Semester Menu modal
        expect(screen.queryByText(/Add Course to Semester/)).not.toBeVisible;
        expect(screen.queryByText(/Add a course/)).not.toBeVisible;
        expect(screen.queryByText(/Delete all courses from semester/)).not.toBeVisible;
        expect(screen.queryByText(/Delete semester/)).not.toBeVisible;
    })
})