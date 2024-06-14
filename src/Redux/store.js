import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Redux/reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});