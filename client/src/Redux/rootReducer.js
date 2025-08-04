import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";
import { authReducer } from "./reducers/authSlice";
import { feedReducer } from "../redux/reducers/feedsSlice";
import { errorReducer } from "../redux/reducers/errorSlice";
import { notificationReducer } from "./reducers/notificationSlice";
import { connectionsReducer } from "../redux/reducers/connectionsSlice";
import { requestReducer } from "../redux/reducers/requestSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  feeds: feedReducer,
  error: errorReducer,
  notification: notificationReducer,
  connections: connectionsReducer,
  request: requestReducer,
});
