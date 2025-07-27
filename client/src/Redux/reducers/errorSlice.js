import { createSlice } from "@reduxjs/toolkit";

const errorInitialState = {
  feedsError: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState: errorInitialState,
  reducers: {
    setFeedsError: (state, action) => {
      state.feedsError = action.payload;
    },
  },
});

// Selected errors
export const selectFeedsError = (store) => store?.error?.feedsError;

export const { setFeedsError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
