import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as reference } from "./reference.slice";

const rootReducer = combineReducers({
  reference,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Action<T> = T | ((prev: T) => T);
