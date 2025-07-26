import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../rootReducer";

const reduxStore = configureStore({ reducer: rootReducer });

export default reduxStore