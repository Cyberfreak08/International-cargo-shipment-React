import { createSlice } from "@reduxjs/toolkit";
import { loadData, getQuarterlyTransactions } from "../../Controllers/service";

const quarterlyTransactionsSlice = createSlice({
  name: "quarter",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    fetchQuarterlyTransactionsPending: (state) => {
      state.status = "loading";
    },
    fetchQuarterlyTransactionsSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    fetchQuarterlyTransactionsError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuarterlyTransactionsPending,
  fetchQuarterlyTransactionsSuccess,
  fetchQuarterlyTransactionsError,
} = quarterlyTransactionsSlice.actions;

export const quarterReducer = quarterlyTransactionsSlice.reducer;

export const fetchQuarterlyTransactions =
  (officeId, quarter) => async (dispatch) => {
    dispatch(fetchQuarterlyTransactionsPending());
    try {
      const data = await loadData();
      const transactions = getQuarterlyTransactions(
        data,
        officeId,
        !quarter ? 1 : quarter
      );
      dispatch(fetchQuarterlyTransactionsSuccess(transactions));
    } catch (error) {
      dispatch(fetchQuarterlyTransactionsError(error.toString()));
    }
  };
