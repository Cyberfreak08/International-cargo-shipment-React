import { createSlice } from "@reduxjs/toolkit";
// name:"user";
const initialState = { user: { username: "",email:"",pasword:"" },
signupLoading: false,
  signupError: null,
  loginLoading: false,
  loginError: null,
  isLoggedIn: false };
const userSlice = createSlice({
    name:"user",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.signupLoading = true;
      state.signupError = null;
    },
    signupSuccess: (state, action) => {
      state.signupLoading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    },
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
    }
  },
});
export const userReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;