import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice";

export const rootReducer = combineReducers({ user: userReducer });
