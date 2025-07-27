import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";
import { authReducer } from "./reducers/authSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});
