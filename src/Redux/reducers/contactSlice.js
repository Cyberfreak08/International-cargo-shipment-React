import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { loadData, getQuarterlyTransactions } from "../../Controllers/service";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    fetchContactListPending: (state) => {
      state.status = "loading";
    },
    fetchContactListSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchContactListError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchContactListPending,
  fetchContactListSuccess,
  fetchContactListError,
} = contactSlice.actions;

export const contactReducer = contactSlice.reducer;

export const fetchContactListFromDb =
  () => async (dispatch) => {
    dispatch(fetchContactListPending());
    try {
      const response = await axios.get(
        "http://localhost:5000/contacts",
      );
      
      dispatch(fetchContactListSuccess(response.data));
    } catch (error) {
      dispatch(fetchContactListError(error.toString()));
    }
  };
