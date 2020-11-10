import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import { NoteEntry } from "../NoteEntry";

describe("NoteEntry component tests", () => {
  test("renders markdown hint", () => {
    const { getByText } = render(<NoteEntry id={89} date={0} edit={false} text="**TODO**" />);
    const el = getByText(/todo/i);
    expect(el).toBeInTheDocument();
  });

  test("renders markdown hint", () => {
    const { getByText } = render(<NoteEntry id={89} date={0} edit={true} text="" />);
    const el = getByText(/markdown text/i);
    expect(el).toBeInTheDocument();
  });
});
