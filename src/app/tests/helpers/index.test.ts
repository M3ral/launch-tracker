import { dateIsValid } from "../../helpers";

describe("dateIsValid", () => {
  it("should return false given an incorrect date", () => {
    expect(dateIsValid("1000-12-00")).toBe(false);
  });
  it("should return true given a correct date", () => {
    expect(dateIsValid("2022-08-12")).toBe(true);
  });
});
