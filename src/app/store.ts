import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gridReducer from "../features/grid/gridSlice";
import localeReducer from "../features/locales/localeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    grid: gridReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;