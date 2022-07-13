import { configureStore } from "@reduxjs/toolkit";
import flagsReducer from "../features/flags/flags";
import audiencesReducer from "../features/audiences/audiences";

const store = configureStore({
  reducer: {
    flags: flagsReducer,
    audiences: audiencesReducer,
  }
});

export default store;