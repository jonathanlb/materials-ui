import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Copyright from "../Copyright";

describe("Copyright component tests", () => {
  test("renders text", () => {
    const { getByText } = render(<Copyright />);
    const el = getByText(/Copyright/i);
    expect(el).toBeInTheDocument();
  });
});