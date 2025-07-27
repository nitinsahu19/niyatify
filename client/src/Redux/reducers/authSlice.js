import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  loginError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setLoginError } = authSlice.actions;
