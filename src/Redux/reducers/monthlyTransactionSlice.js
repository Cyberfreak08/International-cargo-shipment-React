import { createSlice } from "@reduxjs/toolkit";
import { loadData, getMaxMonthlyTransactionsByCategory } from "../../Controllers/service";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const monthlySlice = createSlice({
  name: "monthly",
  initialState,
  reducers: {
    fetchMonthlyTransactionsPending: (state) => {
      state.status = "loading";
    },
    fetchMonthlyTransactionsSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    },
    fetchMonthlyTransactionsError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchMonthlyTransactionsPending,
  fetchMonthlyTransactionsSuccess,
  fetchMonthlyTransactionsError,
} = monthlySlice.actions;

export const fetchMonthlyTransactions =
  (startMonth, endMonth) => async (dispatch) => {
    dispatch(fetchMonthlyTransactionsPending());
    try {
      const data = await loadData(); // Replace with your actual async data loading function
      const transactions = getMaxMonthlyTransactionsByCategory(data, startMonth, endMonth);
      dispatch(fetchMonthlyTransactionsSuccess(transactions));
    } catch (error) {
      dispatch(fetchMonthlyTransactionsError(error.toString()));
    }
  };

export const monthlyReducer = monthlySlice.reducer;
