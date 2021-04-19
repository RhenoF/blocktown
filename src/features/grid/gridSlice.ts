import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { AppThunk, RootState } from "../../app/store";

interface GridState {
  grid_size: any;
  position: any;
  blocks: any;
}

const initialState: GridState = {
  grid_size: { x: 5, y: 4 },
  position: { x: 0, y: 0 },
  blocks: [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ],
};

function sanityCheck(state: any) {
  if (state.position.y < 0) {
    state.position.y = state.grid_size.y - 1;
  }
  if (state.position.y >= state.grid_size.y) {
    state.position.y = 0;
  }
  if (state.position.x < 0) {
    state.position.x = state.grid_size.x - 1;
  }
  if (state.position.x >= state.grid_size.x) {
    state.position.x = 0;
  }
  if (state.blocks.some((e: any) => _.isEqual(e, state.position))) {
    state.position = initialState.position;
  }
}

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    moveUp: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.position.y -= 1;
      sanityCheck(state);
    },
    moveDown: (state) => {
      state.position.y += 1;
      sanityCheck(state);
    },
    moveLeft: (state) => {
      state.position.x -= 1;
      sanityCheck(state);
    },
    moveRight: (state) => {
      state.position.x += 1;
      sanityCheck(state);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    move: (state, action: PayloadAction<any>) => {
      state.position = action;
      sanityCheck(state);
    },
    change_size: (state, action: PayloadAction<any>) => {
      state.grid_size = action;
      sanityCheck(state);
    },
  },
});

export const {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  move,
  change_size,
} = gridSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a position from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.grid.position)`
export const selectPosition = (state: RootState) => state.grid.position;
export const selectGridSize = (state: RootState) => state.grid.grid_size;
export const selectBlocks = (state: RootState) => state.grid.blocks;

export default gridSlice.reducer;
