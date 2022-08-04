import { fireEvent, screen } from "@testing-library/react";
import moment from "moment";
import { ApiStatus } from "../../slices/launchesSlice";
import { Filter } from "../../components/Filter/Filter";
import { incrementMonths } from "../../helpers";
import { renderWithProviders } from "../tests-utils";

describe("components/Filter", () => {
  it("should render the component with the two datepickers", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "loading" as ApiStatus,
      },
    };
    renderWithProviders(<Filter />, { preloadedState });

    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    const inputStartDate = screen.getByTestId("startDate") as HTMLInputElement;
    const inputEndDate = screen.getByTestId("endDate") as HTMLInputElement;
    expect(inputStartDate).toBeInTheDocument();
    const today = moment().format("YYYY-MM-DD");
    expect(inputStartDate.value).toBe(today);
    fireEvent.change(inputStartDate, { target: { value: "2022-08-12" } });

    expect(screen.getByText(/end date/i)).toBeInTheDocument();
    expect(screen.getByTestId("endDate")).toBeInTheDocument();
    const date = incrementMonths(3);
    expect(inputEndDate.value).toBe(date);
    fireEvent.change(inputEndDate, { target: { value: "2022-12-25" } });
  });
});
