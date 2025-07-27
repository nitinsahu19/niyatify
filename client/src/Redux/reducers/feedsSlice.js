import { createSlice } from "@reduxjs/toolkit";

const feedsInitialState = {
  feedsData: [],
};

const feedsSlice = createSlice({
  name: "feeds",
  initialState: feedsInitialState,
  reducers: {
    setFeedsData: (state, action) => {
      state.feedsData = action.payload;
      // console.log("data after action => ", state.feedsData);
    },
  },
});

export const selectFeedsData = (state) => state?.feeds?.feedsData;

export const { setFeedsData } = feedsSlice.actions;

export const feedReducer = feedsSlice.reducer;
