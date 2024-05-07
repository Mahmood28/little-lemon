import { render, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";
import {
  isTimeValid,
  isDateValid,
  isNumberOfGuestsValid,
  isOccasionValid,
} from "./BookingForm";
fdescribe("BookingForm", () => {
  const availableTimes = ["12:00", "13:00", "14:00"];
  const dispatchOnDateChange = jest.fn();
  const submitData = jest.fn();

  test("renders correctly", () => {
    const { getByLabelText } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/time/i)).toBeInTheDocument();
    expect(getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test("calls submitData on form submission", () => {
    const { getByLabelText, getByRole } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    fireEvent.change(getByLabelText(/date/i), {
      target: { value: "2022-12-31" },
    });
    fireEvent.change(getByLabelText(/time/i), { target: { value: "12:00" } });
    fireEvent.change(getByLabelText(/number of guests/i), {
      target: { value: "5" },
    });
    fireEvent.change(getByLabelText(/occasion/i), {
      target: { value: "Birthday" },
    });
    fireEvent.click(getByRole("button"));
    expect(submitData).toHaveBeenCalledWith({
      date: "2022-12-31",
      time: "12:00",
      numberOfGuests: "5",
      occasion: "Birthday",
    });
  });

  test("validates HTML5 validation attributes for date input", () => {
    const { getByLabelText } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    const dateInput = getByLabelText(/date/i);
    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toHaveAttribute("required");
  });

  test("validates HTML5 validation attributes for time input", () => {
    const { getByLabelText } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    const timeInput = getByLabelText(/time/i);
    expect(timeInput).toHaveAttribute("required");
  });

  test("validates HTML5 validation attributes for number of guests input", () => {
    const { getByLabelText } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    const numberOfGuestsInput = getByLabelText(/number of guests/i);
    expect(numberOfGuestsInput).toHaveAttribute("type", "number");
    expect(numberOfGuestsInput).toHaveAttribute("required");
    expect(numberOfGuestsInput).toHaveAttribute("min", "1");
    expect(numberOfGuestsInput).toHaveAttribute("max", "10");
  });

  test("validates HTML5 validation attributes for occasion input", () => {
    const { getByLabelText } = render(
      <BookingForm
        availableTimes={availableTimes}
        dispatchOnDateChange={dispatchOnDateChange}
        submitData={submitData}
      />
    );
    const occasionInput = getByLabelText(/occasion/i);
    expect(occasionInput).toHaveAttribute("required");
  });

  describe("isTimeValid", () => {
    it("should return true for valid time", () => {
      const time = "12:00";
      expect(isTimeValid(time)).toBe(true);
    });

    it("should return false for invalid time", () => {
      const time = "25:00";
      expect(isTimeValid(time)).toBe(false);
    });
  });

  describe("isOccasionValid", () => {
    it("should return true for valid occasion", () => {
      const occasion = "Birthday";
      expect(isOccasionValid(occasion)).toBe(true);
    });

    it("should return false for invalid occasion", () => {
      const occasion = ""; // empty string is invalid
      expect(isOccasionValid(occasion)).toBe(false);
    });
  });

  describe("isNumberOfGuestsValid", () => {
    it("should return true for valid number of guests", () => {
      const numberOfGuests = "5";
      expect(isNumberOfGuestsValid(numberOfGuests)).toBe(true);
    });

    it("should return false for invalid number of guests", () => {
      const numberOfGuests = ""; // empty string is invalid
      expect(isNumberOfGuestsValid(numberOfGuests)).toBe(false);
    });
  });

  describe("isDateValid", () => {
    it("should return true for valid date", () => {
      const date = "2022-12-31";
      expect(isDateValid(date)).toBe(true);
    });

    it("should return false for invalid date", () => {
      const date = "20222-02-30";
      expect(isDateValid(date)).toBe(false);
    });
  });
});
