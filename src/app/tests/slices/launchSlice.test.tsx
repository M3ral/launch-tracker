import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import launchesReducer from "../../slices/launchesSlice";

const mockResponse = {
  count: 49,
  next: "https://lldev.thespacedevs.com/2.2.0/launch/?limit=10&offset=10&window_end__lte=2022-11-04+00%3A00%3A00&window_start__gte=2022-08-04+00%3A00%3A00",
  previous: null,
  results: [
    {
      id: "33bf26a0-818e-4519-a47a-4fe79a07e84e",
      url: "https://lldev.thespacedevs.com/2.2.0/launch/33bf26a0-818e-4519-a47a-4fe79a07e84e/",
      slug: "atlas-v-421-sbirs-geo-6",
      name: "Atlas V 421 | SBIRS GEO-6",
      status: {
        id: 1,
        name: "Go for Launch",
        abbrev: "Go",
        description: "Current T-0 confirmed by official or reliable sources.",
      },
      last_updated: "2022-07-31T17:39:05Z",
      net: "2022-08-04T10:29:00Z",
      window_end: "2022-08-04T11:09:00Z",
      window_start: "2022-08-04T10:29:00Z",
      probability: 80,
      holdreason: "",
      failreason: "",
      hashtag: null,
      launch_service_provider: {
        id: 124,
        url: "https://lldev.thespacedevs.com/2.2.0/agencies/124/",
        name: "United Launch Alliance",
        type: "Commercial",
      },
      rocket: {
        id: 2229,
        configuration: {
          id: 28,
          url: "https://lldev.thespacedevs.com/2.2.0/config/launcher/28/",
          name: "Atlas V 421",
          family: "Atlas",
          full_name: "Atlas V 421",
          variant: "421",
        },
      },
      mission: {
        id: 6088,
        name: "SBIRS GEO-6",
        description:
          "Sixth geosynchronous satellite of the Space Based Infrared System program (SBIRS), providing capabilities for early missile warning and missile defense. SBIRS GEO-6 is the second satellite using Lockheed Martin's LM2100 combat bus.",
        launch_designator: null,
        type: "Government/Top Secret",
        orbit: {
          id: 2,
          name: "Geostationary Transfer Orbit",
          abbrev: "GTO",
        },
      },
      pad: {
        id: 29,
        url: "https://lldev.thespacedevs.com/2.2.0/pad/29/",
        agency_id: null,
        name: "Space Launch Complex 41",
        info_url: null,
        wiki_url:
          "https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_41",
        map_url: "http://maps.google.com/maps?q=28.58341025,-80.58303644",
        latitude: "28.58341025",
        longitude: "-80.58303644",
        location: {
          id: 12,
          url: "https://lldev.thespacedevs.com/2.2.0/location/12/",
          name: "Cape Canaveral, FL, USA",
          country_code: "USA",
          map_image:
            "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_12_20200803142519.jpg",
          total_launch_count: 26,
          total_landing_count: 3,
        },
        map_image:
          "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_29_20200803143528.jpg",
        total_launch_count: 6,
      },
      webcast_live: false,
      image:
        "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/atlas_v_421_image_20210519053741.jpeg",
      infographic: null,
      program: [],
    },
  ],
};

describe("launchSlice", () => {
  it("should return the initial state", function () {
    expect(launchesReducer(undefined, { type: undefined }))
      .toMatchInlineSnapshot(`
Object {
  "items": Array [],
  "status": "idle",
}
`);
  });

  it("should change the state depending on the action types of the request", async () => {
    axios.get = jest.fn().mockResolvedValueOnce(mockResponse);
    const store = configureStore({ reducer: launchesReducer });

    const state = store.getState();
    expect(state).toEqual({
      items: [],
      status: "idle",
    });

    store.dispatch({ type: "launches/fetchLaunches/pending" });
    expect(store.getState()).toEqual({ items: [], status: "loading" });

    store.dispatch({
      type: "launches/fetchLaunches/fulfilled",
      payload: mockResponse,
    });
    expect(store.getState()).toEqual({
      items: [
        {
          agency: {
            id: 124,
            name: "United Launch Alliance",
            type: "Commercial",
            url: "https://lldev.thespacedevs.com/2.2.0/agencies/124/",
          },
          id: "33bf26a0-818e-4519-a47a-4fe79a07e84e",
          latitude: "28.58341025",
          launchTime: "2022-08-04T10:29:00Z",
          longitude: "-80.58303644",
          name: "Atlas V 421 | SBIRS GEO-6",
          padName: "Space Launch Complex 41",
        },
      ],
      meta: {
        count: 49,
        next: {
          limit: "10",
          offset: "10",
          window_end__lte: "2022-11-04 00:00:00",
          window_start__gte: "2022-08-04 00:00:00",
        },
        previous: null,
      },
      status: "completed",
    });
  });

  it("should return an empty items array and status error", () => {
    const store = configureStore({ reducer: launchesReducer });
    axios.get = jest.fn().mockRejectedValueOnce(mockResponse);
    store.dispatch({ type: "launches/fetchLaunches/rejected" });
    expect(store.getState()).toEqual({ items: [], status: "error" });
  });
});
