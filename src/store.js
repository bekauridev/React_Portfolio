import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/projectsSlice";
import goodiesReducer from "./features/goodies/goodiesSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    goodies: goodiesReducer,
  },
});

export default store;
