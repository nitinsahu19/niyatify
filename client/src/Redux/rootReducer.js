import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";
import { authReducer } from "./reducers/authSlice";
import { feedReducer } from "../redux/reducers/feedsSlice";
import { errorReducer } from "../redux/reducers/errorSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  feeds: feedReducer,
  error: errorReducer,
});
