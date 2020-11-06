import React from "react";
import { render } from "@testing-library/react";
import { Keyword } from "../Keyword";

test("renders text", () => {
  const { getByText } = render(<Keyword keyword="important" />);
  const el = getByText(/important/i);
  expect(el).toBeInTheDocument();
});
