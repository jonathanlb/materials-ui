import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { NavBar } from "../NavBar";

describe("NavBar component tests", () => {
  test("renders text", () => {
    const { getByText } = render(<NavBar />);
    ["Materials", "About", "Log out"].forEach(text => {
      const el = getByText(text);
      expect(el).toBeInTheDocument();
    });
  });
});
