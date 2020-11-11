import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { Login } from "../Login";

describe("Login component tests", () => {
  test("renders text", () => {
    const { getAllByText } = render(<Login />);
    const el = getAllByText(/Log in/i);
    expect(el.length).toBeGreaterThan(1)
  });
});
