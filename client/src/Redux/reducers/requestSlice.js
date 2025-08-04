import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  sentRequests: [],
  error: null,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addRequests, setError } = requestSlice.actions;
export const requestReducer = requestSlice.reducer;
