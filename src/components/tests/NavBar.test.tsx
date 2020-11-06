import React from "react";
import { render } from "@testing-library/react";
import { NavBar } from "../NavBar";

test("renders text", () => {
  const { getByText } = render(<NavBar />);
  ["Materials", "About", "Log out"].forEach(text => {
    const el = getByText(text);
    expect(el).toBeInTheDocument();
  });
});
