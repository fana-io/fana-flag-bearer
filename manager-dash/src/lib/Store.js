import { configureStore } from "@reduxjs/toolkit";
import flagsReducer from "../features/flags/flags";
import audiencesReducer from "../features/audiences/audiences";
import attributesReducer from "../features/attributes/attributes";

const store = configureStore({
  reducer: {
    flags: flagsReducer,
    audiences: audiencesReducer,
    attributes: attributesReducer,
  }
});

export default store;