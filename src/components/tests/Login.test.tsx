import React from "react";
import { render } from "@testing-library/react";
import { Login } from "../Login";

test("renders text", () => {
  const { getAllByText } = render(<Login />);
  const el = getAllByText(/Log in/i);
  expect(el.length).toBeGreaterThan(1)
});
