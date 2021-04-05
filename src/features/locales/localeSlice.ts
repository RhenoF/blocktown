import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface LocaleState {
  lang: string;
}

const initialState: LocaleState = {
  lang: "en",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeLocale: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLocale } = localeSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.locale.value)`
export const selectLocale = (state: RootState) => state.locale.lang;

export default localeSlice.reducer;
