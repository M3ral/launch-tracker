import { screen } from "@testing-library/react";
import { ApiStatus } from "../../slices/launchesSlice";
import { Feedback } from "../../components/Feedback/Feedback";
import { renderWithProviders } from "../tests-utils";

describe("components/Feedback", () => {
  it("should show a message while the api is making a request", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "loading" as ApiStatus,
      },
    };
    renderWithProviders(<Feedback />, { preloadedState });
    expect(
      screen.getByRole("heading", {
        name: /loading, please wait\.\.\. 🚀/i,
      })
    ).toBeInTheDocument;
  });
  it("should show a message if there is an error", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "error" as ApiStatus,
      },
    };
    renderWithProviders(<Feedback />, { preloadedState });
    expect(
      screen.getByRole("heading", {
        name: /ups! something went wrong 💥/i,
      })
    ).toBeInTheDocument;
  });
  it("should show a message if there are no results", () => {
    const preloadedState = {
      launches: {
        items: [],
        status: "completed" as ApiStatus,
      },
    };
    renderWithProviders(<Feedback />, { preloadedState });
    expect(screen.getByRole("heading", { name: /ups, no results :\(/i }))
      .toBeInTheDocument;
    expect(screen.getByText(/please try with different dates/i))
      .toBeInTheDocument;
  });
});
