import { createSlice } from "@reduxjs/toolkit";

const errorInitialState = {
  feedsError: "",
  updateError: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState: errorInitialState,
  reducers: {
    setFeedsError: (state, action) => {
      state.feedsError = action.payload;
    },
    setUpdateError: (state, action) => {
      state.updateError = action.payload;
    },
  },
});

// Selected errors
export const selectFeedsError = (store) => store?.error?.feedsError;
export const selectUpdateError = (store) => store?.error?.updateError;

export const { setFeedsError, setUpdateError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
