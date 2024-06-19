import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../../Controllers/userService";
import axios from "axios";

// name:"user";
const initialState = {
  user: { username: "", email: "", pasword: "",usertype: "" },
  signupLoading: false,
  signupError: null,
  loginLoading: false,
  loginError: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.signupLoading = true;
      state.signupError = null;
    },
    signupSuccess: (state, action) => {
      state.signupLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
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
    getUserData: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    getUserDataFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    getUserDataSuccess: (state, action) => {
      state.loginLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
  logout,
} = userSlice.actions;

//thunk functions....

export const getUserDataFromLocalStorage = () => async (dispatch) => {
  try {
    dispatch(getUserData());
    const loggedUser = getUserFromLocalStorage();
    loggedUser !== null
      ? dispatch(getUserDataSuccess(loggedUser))
      : dispatch(signupFailure("User not logged in!!!"));
  } catch (error) {
    dispatch(signupFailure(error.response?.data?.message || error.message));
  }
};

export const signupUser = (user) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await axios.get("http://localhost:5000/users");
    const findUser = response.data.filter(
      (u) => u.email === user.email && u.password === user.password
    );
    if (!findUser.length) {
      user.type ='user';
      const postResponse = await axios.post(
        "http://localhost:5000/users",
        user
      );
      saveUserToLocalStorage(postResponse.data);
      dispatch(signupSuccess(postResponse.data));
    } else {
      signupFailure("The user email already exist,Try logging in");
    }
  } catch (error) {
    dispatch(signupFailure(error.response?.data?.message || error.message));
  }
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.filter(
        (u) => u.email === email && u.password === password
      );
      if (user.length) {
        saveUserToLocalStorage(Object.assign(user));
        dispatch(loginSuccess(Object.assign(user)));
      } 
      else {
        dispatch(loginFailure("Invalid username or password"));
      }
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || error.message));
    }
  };

export const storeContactFormDetails = async (values) => {
  const userDetails = values;
  const postResponse = await axios.post(
    "http://localhost:5000/contacts",
    userDetails
  );
  return postResponse ? true : false;
};
