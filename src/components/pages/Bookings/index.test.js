import { fetchAPI } from "../../../utils/api";
import { initializeTimes, updateTimes } from "./index";

jest.mock("../../../utils/api");

describe("initializeTimes", () => {
  it("should return the expected value", () => {
    const initialAvailableTimes = ["10:00 AM", "11:00 AM"];
    const currentDate = new Date();

    fetchAPI.mockReturnValue(["12:00 PM", "1:00 PM"]);

    const expectedValue = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];

    const result = initializeTimes(initialAvailableTimes);

    expect(fetchAPI).toHaveBeenCalledWith(currentDate);
    expect(result).toEqual(expectedValue);
  });
});

describe("updateTimes", () => {
  it("should return the same value as provided in the state", () => {
    const availableTimes = ["10:00 AM", "11:00 AM", "12:00 PM"];
    const date = new Date();

    // Mock fetchAPI
    fetchAPI.mockReturnValue(availableTimes);

    const result = updateTimes(availableTimes, date);
    expect(result).toEqual(availableTimes);
  });
});
