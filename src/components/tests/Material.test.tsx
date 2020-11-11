import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Material } from "../Material";

function archiveNoteGen(): [(text: string) => Promise<number>, Array<string>] {
  const notes: Array<string> = [];
  function archiveNote(text: string) {
    notes.push(text);
    return Promise.resolve(notes.length - 1);
  }
  return [archiveNote, notes];
}

function keyMaterialGen(): [
  (matId: number, keyword: string) => Promise<void>,
  Map<string, Set<number>>
] {
  const keyword2Material = new Map<string, Set<number>>();

  function keyMaterial(matId: number, keyword: string) {
    const mats = keyword2Material.get(keyword) || new Set<number>();
    mats.add(matId);
    keyword2Material.set(keyword, mats);
    return Promise.resolve();
  }

  return [keyMaterial, keyword2Material];
}

function getKeywords(): Promise<Map<string, number>> {
  const keywords = new Map<string, number>();
  [
    "documentation",
    "javascript",
    "react",
    "rust",
  ].forEach((s: string, i: number) => keywords.set(s, i));
  return Promise.resolve(keywords);
}

describe("Material component tests", () => {
  test("renders editable entries", () => {
    const [archiveNote, notes] = archiveNoteGen();
    const [keyMaterial, keyword2Material] = keyMaterialGen();

    const { getByDisplayValue, getByLabelText } = render(
      <Material
        archiveNote={archiveNote}
        edit
        getKeywords={getKeywords}
        keyMaterial={keyMaterial}
        id={98}
      />
    );

    let el = getByLabelText("Name");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "Manifesto" } });

    el = getByDisplayValue("Manifesto");
    expect(el).toBeInTheDocument();

    el = getByLabelText("URL");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "https://wikipedia.org" } });

    el = getByDisplayValue("https://wikipedia.org");
    expect(el).toBeInTheDocument();

    expect(notes).toEqual([]);
    expect(keyword2Material.size).toBe(0);
  });

  test("renders created entries", () => {
    const [archiveNote, notes] = archiveNoteGen();
    const [keyMaterial, keyword2Material] = keyMaterialGen();

    const { getByDisplayValue, getByLabelText } = render(
      <Material
        archiveNote={archiveNote}
        edit={false}
        getKeywords={getKeywords}
        keyMaterial={keyMaterial}
        name="Manifesto"
        url="https://wikipedia.org"
        id={98}
      />
    );

    let el = getByLabelText("Name");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "Hijack" } });

    el = getByDisplayValue("Manifesto");
    expect(el).toBeInTheDocument();

    el = getByLabelText("URL");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "http://wikipedia.org" } });

    el = getByDisplayValue("https://wikipedia.org");
    expect(el).toBeInTheDocument();

    expect(notes).toEqual([]);
    expect(keyword2Material.size).toBe(0);
  });

  test("keys entries", async () => {
    const [archiveNote, notes] = archiveNoteGen();
    const [keyMaterial, keyword2Material] = keyMaterialGen();

    const { getByText } = render(
      <Material
        archiveNote={archiveNote}
        edit
        getKeywords={getKeywords}
        keyMaterial={keyMaterial}
        id={98}
      />
    );

    let el = getByText("Add");
    expect(el).toBeInTheDocument();
    await waitFor(() => fireEvent.click(el));

    let els = screen.queryAllByText("documentation");
    expect(els.length).toBe(1);
    el = screen.getByText("documentation");
    waitFor(() => fireEvent.click(el));
    const expectedMats = new Set<number>();
    expectedMats.add(98);
    expect(keyword2Material.get("documentation")).toEqual(expectedMats);

    els = screen.queryAllByText("documentation");
    expect(els.length).toBe(2);

    expect(notes).toEqual([]);
  });

  test("notates entries", async () => {
    const [archiveNote, notes] = archiveNoteGen();
    const [keyMaterial, keyword2Material] = keyMaterialGen();

    const { getByRole, getByText } = render(
      <Material
        archiveNote={archiveNote}
        edit
        getKeywords={getKeywords}
        keyMaterial={keyMaterial}
        id={98}
      />
    );

    let el = getByText("Notate");
    expect(el).toBeInTheDocument();
    await waitFor(() => fireEvent.click(el));

    el = getByRole("textbox");
    fireEvent.change(el, { target: { value: "todo list" } });

    el = screen.getByText("Save");
    waitFor(() => fireEvent.click(el));

    el = getByText("todo list");
    expect(el).toBeInTheDocument();

    expect(notes).toEqual(["todo list"]);
    expect(keyword2Material.size).toBe(0);
  });
});
