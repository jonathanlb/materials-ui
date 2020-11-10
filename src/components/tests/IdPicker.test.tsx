import React from "react";
import { render } from "@testing-library/react";
import { IdPicker } from "../IdPicker";

const ids = new Map<string, number>();
['bluegrass', 'blues', 'classical', 'country', 'folk', 'jazz', 'rock']
  .forEach((s: string, i: number) => ids.set(s, i));

describe("IdPicker tests", () => {
  test("renders text", () => {
    
    function cancelled() {

    }

    function selected() {

    }

    const { getByText } = render(
      <IdPicker
        cancelled={cancelled}
        selected={selected}
        ids={ids}
        titleHint="Genres"
      />
    );

    let el = getByText(/genres/i);
    expect(el).toBeInTheDocument();

    el = getByText('jazz');
    expect(el).toBeInTheDocument();

  });
});
