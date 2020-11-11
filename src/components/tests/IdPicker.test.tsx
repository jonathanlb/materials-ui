import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { IdPicker, IdPickerDialog } from "../IdPicker";

const ids = new Map<string, number>();
[
  "bluegrass",
  "blues",
  "classical",
  "country",
  "folk",
  "jazz",
  "rock",
].forEach((s: string, i: number) => ids.set(s, i));

function cancelStub() {}

function selectedStub() {}

describe("IdPicker tests", () => {
  test("renders text", () => {
    render(
      <IdPicker
        cancelled={cancelStub}
        selected={selectedStub}
        ids={ids}
        titleHint="Genres"
      />
    );

    let el = screen.getByText(/genres/i);
    expect(el).toBeInTheDocument();

    el = screen.getByText("jazz");
    expect(el).toBeInTheDocument();
  });

  test("selects item", () => {
    const selected = { value: "" };
    render(
      <IdPicker
        cancelled={cancelStub}
        selected={(v: string) => {
          selected.value = v;
        }}
        ids={ids}
        titleHint="Genres"
      />
    );

    const el = screen.getByText(/country/i);
    fireEvent.click(el);
    expect(selected.value).toEqual("country");
  });

  test("updates filter", () => {
    render(
      <IdPicker
        cancelled={cancelStub}
        selected={selectedStub}
        ids={ids}
        titleHint="Genres"
      />
    );

    let el = screen.getByRole("textbox");
    expect(el).toBeInTheDocument();
    expect(screen.queryByText(/classical/i)).not.toBe(null);

    fireEvent.change(el, { target: { value: "jazz" } });
    el = screen.getByText(/jazz/i);
    expect(el).toBeInTheDocument();

    expect(screen.queryByText(/classical/i)).toBe(null);
  });

  test("dialog cancels", () => {
    const cancelled = { value: "" };

    render(
      <IdPickerDialog
        open
        cancelled={() => {
          cancelled.value = "true";
        }}
        selected={selectedStub}
        ids={ids}
        titleHint="Genres"
      />
    );

    const el = screen.getByText("Cancel");
    fireEvent.click(el);
    expect(cancelled.value).toEqual("true");
  });

  test("dialog selects", () => {
    const selected = { value: "" };

    render(
      <IdPickerDialog
        open
        cancelled={cancelStub}
        selected={(v: string) => {
          selected.value = v;
        }}
        ids={ids}
        titleHint="Genres"
      />
    );

    const el = screen.getByText("bluegrass");
    fireEvent.click(el);
    expect(selected.value).toEqual("bluegrass");
  });
});
