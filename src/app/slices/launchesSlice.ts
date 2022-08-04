import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { parseParams } from "../helpers";
import { RootState } from "../store";

export type ApiStatus = "idle" | "loading" | "completed" | "error";

export interface Agency {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface Launch {
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  padName: string;
  launchTime: string;
  agency: Agency;
}

export interface LaunchesState {
  items: Launch[];
  status: ApiStatus;
  meta?: {
    count: number;
    next: {
      [key: string]: string;
    } | null;
    previous: {
      [key: string]: string;
    } | null;
  };
}

export interface Pad {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export type Query = {
  window_start__gte: string;
  window_end__lte: string;
  limit?: string;
  offset?: string;
};

const initialState: LaunchesState = {
  items: [],
  status: "idle",
};

export const getLaunches = createAsyncThunk(
  "launches/fetchLaunches",
  async (query: Query) => {
    try {
      const _query = "?" + new URLSearchParams(query).toString();
      const { data } = await axios.get(`/launch/${_query}`);
      return data;
    } catch {
      return new Error("Ups something went wrong");
    }
  }
);

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLaunches.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(getLaunches.fulfilled, (state, action) => {
      state.status = "completed";
      const { count, next, previous, results } = action.payload;
      state.items = results.map((launch: any) => {
        const { name, id, window_start, pad, launch_service_provider } = launch;
        return {
          id,
          name,
          latitude: pad.latitude,
          longitude: pad.longitude,
          padName: pad.name,
          launchTime: window_start,
          agency: {
            ...launch_service_provider,
          },
        };
      });
      state.meta = {
        count,
        next: next ? parseParams(next) : null,
        previous: previous ? parseParams(previous) : null,
      };
    });
    builder.addCase(getLaunches.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export default launchesSlice.reducer;

export const launches = (state: RootState) => state.launches.items;
export const status = (state: RootState) => state.launches.status;
export const launchCount = (state: RootState) => state.launches.items.length;
export const metaCount = (state: RootState) => state.launches.meta?.count;
export const nextLaunches = (state: RootState) => state.launches.meta?.next;
export const previousLaunches = (state: RootState) =>
  state.launches.meta?.previous;
