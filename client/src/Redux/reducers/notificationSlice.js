import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    closeNotification: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showNotification, closeNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
