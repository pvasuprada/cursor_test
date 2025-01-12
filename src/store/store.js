import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slices/layoutSlice";
import filterReducer from "./slices/filterSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});
