import { createSlice } from "@reduxjs/toolkit";

const goodiesSlice = createSlice({
  name: "goodies",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setGoodies: (state, action) => {
      state.items = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGoodies, setStatus, setError } = goodiesSlice.actions;

export const selectGoodies = (state) => state.goodies.items;
export const selectGoodiesStatus = (state) => state.goodies.status;

export default goodiesSlice.reducer;
