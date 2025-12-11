import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setProjects: (state, action) => {
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

export const { setProjects, setStatus, setError } = projectsSlice.actions;

export const selectProjects = (state) => state.projects.items;

export const selectProjectBySlug = (state, slug) =>
  state.projects.items.find((project) => project.slug === slug);

export default projectsSlice.reducer;
