import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { Keyword } from "../Keyword";

describe("Keyword component tests", () => {
  test("renders text", () => {
    const { getByText } = render(<Keyword keyword="important" />);
    const el = getByText(/important/i);
    expect(el).toBeInTheDocument();
  });
});
