import React from "react";

import { render, cleanup, fireEvent, waitForElement, getByAltText, getByText, prettyDOM, getAllByTestId, getByTestId, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const{ getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
      
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it.only("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    // const appointments = getAllByTestId(container, "appointment");

    const appointment = getAllByTestId(container, "appointment")[0];


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

  });
});
