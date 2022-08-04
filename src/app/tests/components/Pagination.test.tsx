import { fireEvent, screen } from "@testing-library/react";
import { ApiStatus } from "../../slices/launchesSlice";
import { Pagination } from "../../components/Pagination/Pagination";
import { renderWithProviders } from "../tests-utils";

describe("components/Pagination", () => {
  it("should render the Next button", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "completed" as ApiStatus,
        meta: {
          count: 11,
          next: {
            something: "else",
          },
          previous: {
            something: "else",
          },
        },
      },
    };
    renderWithProviders(<Pagination />, { preloadedState });
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
  });
  it("should render the Previous button", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "completed" as ApiStatus,
        meta: {
          count: 11,
          next: {
            something: "else",
          },
          previous: {
            something: "else",
          },
        },
      },
    };
    renderWithProviders(<Pagination />, { preloadedState });
    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toBeDisabled();
    fireEvent.click(previousButton);
  });
});
