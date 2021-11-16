import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Semester Menu", () => { // Runs various tests on SemesterMenu.tsx

    render(<App />); // Renders the app
    userEvent.click(screen.getByRole('button', { name: "Close" })); // Closes welcome modal
    const semMenuDots = screen.getAllByLabelText("Sem Menu Dots"); // Stores all buttons that open the Semester Menu in a variable

    test("is not visible before button is clicked", () => { // Tests that header and buttons are visible
        expect(screen.getByText(/Add Course to Semester/)).not.toBeVisible;
        expect(screen.getByText(/Add a course/)).not.toBeVisible;
        expect(screen.getByText(/Delete all courses from semester/)).not.toBeVisible;
        expect(screen.getByText(/Delete semester/)).not.toBeVisible;
    });

    userEvent.click(semMenuDots[0]); // Clicks on the first Semester Menu button (corresponds to First Year, Fall)

    test("is visible after button is clicked", () => { // Tests that header and buttons are visible
        expect(screen.getByText(/Add Course to Semester/)).toBeVisible;
        expect(screen.getByText(/Add a course/)).toBeVisible;
        expect(screen.getByText(/Delete all courses from semester/)).toBeVisible;
        expect(screen.getByText(/Delete semester/)).toBeVisible;
    });
});