import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStoryOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleStoryOpen: (state) => {
      state.isStoryOpen = !state.isStoryOpen;
    },
  },
});

export const { toggleStoryOpen } = userSlice.actions;

export default userSlice.reducer;
