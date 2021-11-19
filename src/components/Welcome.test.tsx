import React from "react";
import { render, screen} from "@testing-library/react";
import App from "../App";

describe("Welcome Modal", () => {
    beforeEach(() => {
        render(<App />);
    });
    it("Shows the Welcome Modal when the website loads", () => {
        const element = screen.getByText("Welcome!");
        expect(element).toBeInTheDocument();
    });
});
