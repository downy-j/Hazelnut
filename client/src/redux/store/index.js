import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redusers";

const store = configureStore({
  reducer: {
    data: rootReducer,
  },
});

export default store;
