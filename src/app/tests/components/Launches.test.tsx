import { render, screen } from "@testing-library/react";
import { ApiStatus } from "../../slices/launchesSlice";
import { Launches } from "../../components/Launches/Launches";
import { renderWithProviders } from "../tests-utils";
import * as reduxHooks from "../../hooks";
jest.mock("../../hooks");

describe("components/Launches", () => {
  it("should render the map ", () => {
    const preloadedState = {
      launches: {
        items: [
          {
            id: "8b442a10-9355-46aa-8af9-75bdb075aefd",
            name: "Long March 5B | Mengtian",
            latitude: "19.614354",
            longitude: "110.951057",
            padName: "Wenchang",
            launchTime: "2022-10-31T00:00:00Z",
            agency: {
              id: 88,
              url: "https://lldev.thespacedevs.com/2.2.0/agencies/88/",
              name: "China Aerospace Science and Technology Corporation",
              type: "Government",
            },
          },
        ],
        status: "complete" as ApiStatus,
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
    const spy = jest.spyOn(reduxHooks, "useAppSelector");
    spy.mockReturnValue(preloadedState);

    const { container } = renderWithProviders(<Launches />, {
      preloadedState,
    });

    expect(container).toBeInTheDocument();
  });
});
