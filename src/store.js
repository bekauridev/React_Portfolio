import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/projectsSlice";
import goodiesReducer from "./features/goodies/goodiesSlice";
import blogsReducer from "./features/blogs/blogsSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    goodies: goodiesReducer,
    blogs: blogsReducer,
  },
});

export default store;
