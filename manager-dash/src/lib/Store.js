import { configureStore } from "@reduxjs/toolkit";
import flagsReducer from "../features/flags/flags";

const store = configureStore({
  reducer: {
    flags: flagsReducer,
  }
});

export default store;