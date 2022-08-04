import React, { PropsWithChildren } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootState } from "../store";
import launchesReducer from "../slices/launchesSlice";

// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
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
        status: "completed",
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { launches: launchesReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
