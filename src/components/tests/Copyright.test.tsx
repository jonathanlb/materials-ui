import React from "react";
import { render } from "@testing-library/react";
import Copyright from "../Copyright";

test("renders text", () => {
  const { getByText } = render(<Copyright />);
  const el = getByText(/Copyright/i);
  expect(el).toBeInTheDocument();
});
