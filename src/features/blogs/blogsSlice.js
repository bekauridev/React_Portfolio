import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setBlogs: (state, action) => {
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

export const { setBlogs, setStatus, setError } = blogsSlice.actions;

export const selectBlogs = (state) => state.blogs.items;
export const selectBlogBySlug = (state, slug) =>
  state.blogs.items.find((blog) => blog.slug === slug);

export default blogsSlice.reducer;
