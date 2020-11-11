import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { NoteEntry, NotateDialog } from "../NoteEntry";

describe("NoteEntry component tests", () => {
  test("renders markdown", () => {
    const { getByText } = render(
      <NoteEntry id={89} date={0} edit={false} text="**TODO**" />
    );
    const el = getByText(/todo/i);
    expect(el).toBeInTheDocument();
  });

  test("renders markdown hint", () => {
    const { getByText } = render(<NoteEntry id={89} date={0} edit text="" />);
    const el = getByText(/markdown text/i);
    expect(el).toBeInTheDocument();
  });

  test("updates content", () => {
    const { getByText, getByRole } = render(
      <NoteEntry id={89} date={0} edit text="" />
    );
    let el = getByRole("textbox");
    fireEvent.change(el, { target: { value: "todo list" } });

    el = getByText("todo list");
    expect(el).toBeInTheDocument();
  });

  test("dialog cancels", () => {
    const cancelled = { value: "" };
    const { getByText } = render(
      <NotateDialog
        id={89}
        date={0}
        edit
        open
        text=""
        cancelled={() => {
          cancelled.value = "true";
        }}
        save={() => {}}
      />
    );

    const el = getByText("Cancel");
    fireEvent.click(el);
    expect(cancelled.value).toEqual("true");
  });

  test("dialog stores text", () => {
    const saved = { value: "" };
    const { getByRole, getByText } = render(
      <NotateDialog
        id={89}
        date={0}
        edit
        open
        text=""
        save={(text: string) => {
          saved.value = text;
        }}
        cancelled={() => {}}
      />
    );

    let el = getByRole("textbox");
    fireEvent.change(el, { target: { value: "todo list" } });

    el = getByText("Save");
    fireEvent.click(el);
    expect(saved.value).toEqual("todo list");
  });
});
