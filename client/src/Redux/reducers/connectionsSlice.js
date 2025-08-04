import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [],
};

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
  },
});

export const { addConnections } = connectionsSlice.actions;

export const connectionsReducer = connectionsSlice.reducer;
