import React from "react";

import { render, cleanup, fireEvent, waitForElement, findByText, waitForElementToBeRemoved, getByAltText, getByText, prettyDOM, getAllByTestId, getByTestId, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const{ getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
      
      fireEvent.click(getByText("Tuesday"))
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
      
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("deletes an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    await waitForElement(() => (getByAltText(appointment, "Add")));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //  Render the Application.
    const { container, debug } = render(<Application />);
    //  Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Edit"));
    debug();
  
    //  Check that the form is displayed.
    getByTestId(appointment, "student-name-input");
  
    //click on interviewer list to change the interviewer to Sylvia Palmer
    //  change the student name input text to "Lydia Miller-Jones"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //click save
    fireEvent.click(getByText(appointment, "Save"));

    //  Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //  Wait until the element with "Lydia Miller-Jones" is displayed
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    await waitForElement(() => (getByText(appointment, "Lydia Miller-Jones")));

    // Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });

    it("shows the save error when failing to save an appointment", async () => {
      axios.put.mockRejectedValueOnce({});
      const { container, debug } = render(<Application />);
      
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
  
      fireEvent.click(getByAltText(appointment, "Add"));
  
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "Saving")).toBeInTheDocument();

      await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
      await waitForElement(() => getByText(appointment, "Error"));

    });

    it("shows the delete error when failing to save an appointment", async () => {
      axios.delete.mockRejectedValueOnce({});
      const { container, debug } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));

      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(getByAltText(appointment, "Delete"));

      expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
      fireEvent.click(getByText(appointment, "Confirm"));

      await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
      await waitForElement(() => getByText(appointment, "Error"));

    });
});
