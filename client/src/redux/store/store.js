import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redusers";

export const store = configureStore({
  reducer: { data: rootReducer },
});
